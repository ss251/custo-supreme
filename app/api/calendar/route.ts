// app/api/calendar/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { addMinutes, parseISO, format, addHours, isBefore, isAfter } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { supabase } from '@/lib/supabase';

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!;
const calendarId = process.env.GOOGLE_CALENDAR_ID!;

const TIMEZONE = 'America/Chicago';

const oauth2Client = new OAuth2Client(clientId, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const calendar = google.calendar({ version: 'v3',  auth: oauth2Client as any });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateParam = searchParams.get('date');

  if (!dateParam) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  try {
    const date = toZonedTime(parseISO(dateParam), TIMEZONE);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    // Fetch working hours from Supabase
    const { data: workingHours, error: workingHoursError } = await supabase
      .from('timings')
      .select('*')
      .single();

    if (workingHoursError) {
      throw workingHoursError;
    }

    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busySlots = events.data.items?.map(event => ({
      start: fromZonedTime(new Date(event.start?.dateTime || event.start?.date || ''), TIMEZONE),
      end: fromZonedTime(new Date(event.end?.dateTime || event.end?.date || ''), TIMEZONE),
    })) || [];

    const availableSlots = generateAvailableSlots(date, busySlots, workingHours);

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json({ error: 'Error fetching available slots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { start, end, name, email, companyName, phoneNumber, companyAddress, additionalInfo } = body;

    const startTime = fromZonedTime(new Date(start), TIMEZONE);
    const endTime = fromZonedTime(new Date(end), TIMEZONE);

    if (endTime <= startTime) {
      return NextResponse.json({ error: 'Invalid time range' }, { status: 400 });
    }

    const event: calendar_v3.Schema$Event = {
      summary: 'Available Walk-through Times',
      description: `Name: ${name}\nEmail: ${email}\nCompany: ${companyName}\nPhone: ${phoneNumber}\nAddress: ${companyAddress}\nAdditional Info: ${additionalInfo ? additionalInfo : 'N/A'}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: TIMEZONE,
      },
      attendees: [{ email: email }, {email: 'h.nelson@custosupreme.com'}, {email: 'admin@custosupreme.com'}, {email: 'c.james@custosupreme.com'}],
      reminders: {
        useDefault: true,
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      sendUpdates: 'all',
      sendNotifications: true,
    });

    return NextResponse.json({ message: 'Booking created successfully', eventId: createdEvent.data.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
  }
}

function isRecurringEvent(event: { start: Date; end: Date }) {
  return event.start.getHours() === 13 && event.end.getHours() === 16;
}

function generateAvailableSlots(date: Date, busySlots: { start: Date; end: Date }[], workingHours: any) {
  const dayOfWeek = date.getDay() + 1;
  const dayWorkingHours = workingHours[dayOfWeek.toString()];

  console.log('Day of week:', dayOfWeek);
  console.log('Working hours for the day:', dayWorkingHours);

  if (!dayWorkingHours || !dayWorkingHours.isOpen) {
    console.log('Day is closed or no working hours found');
    return [];
  }

  // Parse the start and end times, considering 12-hour format
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    return period === 'PM' && hours !== 12 ? hours + 12 : hours;
  };

  const startHour = parseTime(dayWorkingHours.start);
  const endHour = parseTime(dayWorkingHours.end);
  const [, startMinute] = dayWorkingHours.start.split(':');
  const [, endMinute] = dayWorkingHours.end.split(':');

  console.log('Start time:', startHour, startMinute);
  console.log('End time:', endHour, endMinute);

  const slots = [];
  let currentSlot = new Date(date);
  currentSlot.setHours(startHour, parseInt(startMinute), 0, 0);
  const endTime = new Date(date);
  endTime.setHours(endHour, parseInt(endMinute), 0, 0);
  const now = new Date();
  const twelveHoursFromNow = addHours(now, 12);

  console.log('Current slot:', currentSlot);
  console.log('End time:', endTime);
  console.log('Now:', now);
  console.log('Twelve hours from now:', twelveHoursFromNow);

  while (isBefore(currentSlot, endTime)) {
    const slotEnd = addMinutes(currentSlot, 30);
    
    // Convert times to UTC for comparison
    const currentSlotUTC = fromZonedTime(currentSlot, TIMEZONE);
    const slotEndUTC = fromZonedTime(slotEnd, TIMEZONE);
    const twelveHoursFromNowUTC = fromZonedTime(twelveHoursFromNow, TIMEZONE);

    if (isAfter(currentSlotUTC, twelveHoursFromNowUTC)) {
      const isAvailable = !busySlots.some(busy => 
        !isRecurringEvent(busy) && (
          (isAfter(currentSlotUTC, busy.start) && isBefore(currentSlotUTC, busy.end)) ||
          (isAfter(slotEndUTC, busy.start) && isBefore(slotEndUTC, busy.end)) ||
          (isBefore(currentSlotUTC, busy.start) && isAfter(slotEndUTC, busy.end))
        )
      );

      console.log('Slot:', format(currentSlot, 'HH:mm'), '-', format(slotEnd, 'HH:mm'), 'Available:', isAvailable);

      if (isAvailable) {
        slots.push({
          start: format(currentSlot, 'hh:mm a'),
          end: format(slotEnd, 'hh:mm a'),
        });
      }
    }

    currentSlot = slotEnd;
  }

  console.log('Generated slots:', slots);

  return slots;
}


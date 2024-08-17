// app/api/calendar/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { addMinutes, parseISO, format, addHours } from 'date-fns';
import { toZonedTime, fromZonedTime} from 'date-fns-tz';

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
    const date = parseISO(dateParam);
    const startOfDay = fromZonedTime(new Date(date.setHours(0, 0, 0, 0)), TIMEZONE);
    const endOfDay = fromZonedTime(new Date(date.setHours(23, 59, 59, 999)), TIMEZONE);

    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busySlots = events.data.items?.map(event => ({
      start: toZonedTime(new Date(event.start?.dateTime || event.start?.date || ''), TIMEZONE),
      end: toZonedTime(new Date(event.end?.dateTime || event.end?.date || ''), TIMEZONE),
    })) || [];

    const availableSlots = generateAvailableSlots(date, busySlots);

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

  function generateAvailableSlots(date: Date, busySlots: { start: Date; end: Date }[]) {
    const dayOfWeek = date.getDay();
    let workingHours;
  
    // Set working hours based on the day of the week
    if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4) { // Mon, Tue, Thu
      workingHours = {
        start: { hours: 15, minutes: 30 },
        end: { hours: 18, minutes: 0 },
      };
    } else if (dayOfWeek === 5) { // Fri
      workingHours = {
        start: { hours: 14, minutes: 30 },
        end: { hours: 17, minutes: 0 },
      };
    } else {
      // No available slots for other days
      return [];
    }
  
    const slots = [];
    let currentSlot = new Date(date);
    currentSlot.setHours(workingHours.start.hours, workingHours.start.minutes, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(workingHours.end.hours, workingHours.end.minutes, 0, 0);
    const now = new Date();
    const twelveHoursFromNow = addHours(now, 12);
  
    while (currentSlot < endTime) {
      const slotEnd = addMinutes(currentSlot, 30);
      
      // Check if the slot is at least 12 hours in the future
      if (currentSlot >= twelveHoursFromNow) {
        const isAvailable = !busySlots.some(busy => 
          !isRecurringEvent(busy) && (
            (currentSlot >= busy.start && currentSlot < busy.end) ||
            (slotEnd > busy.start && slotEnd <= busy.end) ||
            (currentSlot <= busy.start && slotEnd >= busy.end)
          )
        );
  
        if (isAvailable) {
          slots.push({
            start: format(currentSlot, 'HH:mm'),
            end: format(slotEnd, 'HH:mm'),
          });
        }
      }
  
      currentSlot = slotEnd;
    }
  
    return slots;
  }
  
  
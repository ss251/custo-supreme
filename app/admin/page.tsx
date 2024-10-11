'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'react-hot-toast';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface DayTiming {
  isOpen: boolean;
  start: string;
  end: string;
}

interface Timings {
  [key: number]: DayTiming;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [timings, setTimings] = useState<Timings>({
    0: { isOpen: false, start: '09:00', end: '17:00' },
    1: { isOpen: true, start: '15:30', end: '18:00' },
    2: { isOpen: true, start: '15:30', end: '18:00' },
    3: { isOpen: false, start: '15:30', end: '18:00' },
    4: { isOpen: true, start: '15:30', end: '18:00' },
    5: { isOpen: true, start: '14:30', end: '17:00' },
    6: { isOpen: false, start: '09:00', end: '17:00' },
  });

  useEffect(() => {
    fetchTimings();
  }, []);

  const fetchTimings = async () => {
    try {
      const response = await fetch('/api/calendar/timings');
      if (response.ok) {
        const data = await response.json();
        // Remove the id field from the data
        const { id, ...timingsData } = data;
        setTimings(timingsData);
      }
    } catch (error) {
      console.error('Error fetching timings:', error);
    }
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast.error('Invalid password');
    }
  };

  const handleTimingChange = (day: number, field: keyof DayTiming, value: string | boolean) => {
    setTimings(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/calendar/timings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, ...timings }),
      });
      if (response.ok) {
        toast.success('Timings updated successfully');
      } else {
        toast.error('Failed to update timings');
      }
    } catch (error) {
      toast.error('Error updating timings');
    }
  };

  const handleBulkUpdate = (field: keyof DayTiming, value: string | boolean) => {
    setTimings(prev => {
      const updatedTimings = { ...prev };
      Object.keys(updatedTimings).forEach(day => {
        updatedTimings[Number(day)][field as keyof DayTiming] = value as never;
      });
      return updatedTimings;
    });
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">CustoSupreme Admin: Update Available Timings</h1>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="mb-4"
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin: Update Available Timings</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Bulk Update</h2>
        <div className="flex gap-4 items-center">
          <Select onValueChange={(value) => handleBulkUpdate('start', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select start time" />
            </SelectTrigger>
            <SelectContent>
              {generateTimeOptions().map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleBulkUpdate('end', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select end time" />
            </SelectTrigger>
            <SelectContent>
              {generateTimeOptions().map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="bulk-open"
              onCheckedChange={(checked) => handleBulkUpdate('isOpen', checked)}
            />
            <Label htmlFor="bulk-open">Set all days open/closed</Label>
          </div>
        </div>
      </div>
      {Object.entries(timings).map(([day, timing]) => (
        <div key={day} className="mb-4 p-4 border rounded">
          <h2 className="font-semibold mb-2">{dayNames[Number(day)]}</h2>
          <div className="flex gap-4 items-center">
            <Switch
              id={`day-${day}-open`}
              checked={timing.isOpen}
              onCheckedChange={(checked) => handleTimingChange(Number(day), 'isOpen', checked)}
            />
            <Label htmlFor={`day-${day}-open`}>Open</Label>
            <Select
              value={timing.start}
              onValueChange={(value) => handleTimingChange(Number(day), 'start', value)}
              disabled={!timing.isOpen}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map(time => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={timing.end}
              onValueChange={(value) => handleTimingChange(Number(day), 'end', value)}
              disabled={!timing.isOpen}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map(time => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
      <Button onClick={handleSubmit} className="mt-4">Update Timings</Button>
    </div>
  );
}

function generateTimeOptions() {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour % 12 || 12;
        options.push(`${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`);
      }
    }
    return options;
  }
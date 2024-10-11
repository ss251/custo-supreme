import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export interface BookingDetails {
    start: string;
    end: string;
    name: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    companyAddress: string;
    additionalInfo?: string;
  }

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfWeek(date));
    const end = endOfWeek(endOfWeek(date));
    return eachDayOfInterval({ start, end });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
    toast({
      title: "Date Selected",
      description: `You selected ${format(date, 'MMMM d, yyyy')}`,
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevMonth} variant="outline"><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <Button onClick={handleNextMonth} variant="outline"><ChevronRight className="h-4 w-4" /></Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
        {getDaysInMonth(currentDate).map((date, index) => (
          <Button
            key={index}
            onClick={() => handleDateClick(date)}
            variant="ghost"
            className={`
              p-2 text-sm
              ${!isSameMonth(date, currentDate) ? 'text-gray-400' : ''}
              ${isSameDay(date, selectedDate) ? 'bg-primary text-primary-foreground' : ''}
              ${isToday(date) ? 'border border-primary' : ''}
            `}
          >
            {format(date, 'd')}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
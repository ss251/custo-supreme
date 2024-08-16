// components/CustomCalendar.tsx

import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isBefore,
  isAfter,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

interface TimeSlot {
  start: string;
  end: string;
}

export interface BookingDetails {
  start: string;
  end: string;
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  companyAddress: string;
  additionalInfo: string;
}

interface CustomCalendarProps {
  onBookingConfirmed: (bookingDetails: BookingDetails) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onBookingConfirmed,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<Partial<BookingDetails>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/calendar?date=${format(date, "yyyy-MM-dd")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }
      const data = await response.json();
      setAvailableSlots(data.slots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      toast.error("Failed to fetch available slots. Please try again.");
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && selectedDate && selectedSlot) {
      setBookingDetails((prev) => ({
        ...prev,
        start: `${format(selectedDate, "yyyy-MM-dd")}T${selectedSlot.start}:00`,
        end: `${format(selectedDate, "yyyy-MM-dd")}T${selectedSlot.end}:00`,
      }));
      setStep(2);
    } else if (step === 2) {
      if (validateForm()) {
        setStep(3);
      }
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "email",
      "companyName",
      "phoneNumber",
      "companyAddress",
    ];
    const missingFields = requiredFields.filter(
      (field) => !bookingDetails[field as keyof BookingDetails]
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }
    return true;
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleBookingConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      console.log("Booking created:", data);
      onBookingConfirmed(bookingDetails as BookingDetails);
      toast.success("Booking confirmed successfully!");
      setIsDialogOpen(false);
      setStep(1);
      setBookingDetails({});
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 60),
  };

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 3 || day === 6; // Sunday (0), Wednesday (3), Saturday (6)
  };

  return (
    <div className="grid gap-4 py-4">
      {step === 1 && (
        <>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={[
              disabledDays, // Disable dates more than 30 days in the future
              (date) => isDateDisabled(date), // Disable specific days of the week
            ]}
            className="rounded-md border"
            modifiersStyles={{
              disabled: {
                opacity: 0.5,
                pointerEvents: "none",
                backgroundColor: "var(--muted)",
              },
            }}
          />
          {isLoading ? (
            <div>Loading available slots...</div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center">No available slots for this date</div>
          ) : (
            <Select
              onValueChange={(value) => handleSlotSelect(JSON.parse(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map((slot, index) => (
                  <SelectItem key={index} value={JSON.stringify(slot)}>
                    {slot.start} - {slot.end}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            onClick={handleNextStep}
            disabled={!selectedSlot || isLoading}
          >
            Next
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <Label htmlFor="name">Name*</Label>
          <Input
            id="name"
            name="name"
            value={bookingDetails.name || ""}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={bookingDetails.email || ""}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="companyName">Company Name*</Label>
          <Input
            id="companyName"
            name="companyName"
            value={bookingDetails.companyName || ""}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="phoneNumber">Phone Number*</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={bookingDetails.phoneNumber || ""}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="companyAddress">Company Address*</Label>
          <Input
            id="companyAddress"
            name="companyAddress"
            value={bookingDetails.companyAddress || ""}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="additionalInfo">Additional Information</Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={bookingDetails.additionalInfo || ""}
            onChange={handleInputChange}
          />

          <div className="flex justify-between">
            <Button onClick={handlePrevStep}>Back</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h3 className="text-lg font-semibold">Confirm Your Booking</h3>
          <p>
            Date: {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
          </p>
          <p>
            Time:{" "}
            {selectedSlot ? `${selectedSlot.start} - ${selectedSlot.end}` : ""}
          </p>
          <p>Name: {bookingDetails.name}</p>
          <p>Email: {bookingDetails.email}</p>
          <p>Company: {bookingDetails.companyName}</p>
          <p>Phone: {bookingDetails.phoneNumber}</p>
          <p>Address: {bookingDetails.companyAddress}</p>
          <p>Additional Info: {bookingDetails.additionalInfo}</p>
          <div className="flex justify-between">
            <Button onClick={handlePrevStep}>Back</Button>
            <Button onClick={handleBookingConfirm} disabled={isLoading}>
              {isLoading ? "Confirming..." : "Confirm Booking"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCalendar;

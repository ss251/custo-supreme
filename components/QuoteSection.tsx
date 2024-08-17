"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateQuote, QuoteResult } from "@/lib/QuoteCalculator";
import { InlineWidget } from "react-calendly";
import { X } from "lucide-react";
import CustomCalendar, { BookingDetails } from "./CustomCalendar";
import { toast } from 'react-hot-toast';

export interface QuoteFormData {
  propertyType: string;
  totalCleanableSpace: string;
  carpetedArea: string;
  hardSurfaceArea: string;
  trashCans: string;
  glassWindowsDoors: string;
  toiletsUrinals: string;
  dispensers: string;
  cleaningFrequency: string;
}

const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "healthcare", label: "Healthcare Facility" },
];

const frequencyOptions = [
  { value: "1", label: "1 time per week" },
  { value: "2", label: "2 times per week" },
  { value: "3", label: "3 times per week" },
  { value: "4", label: "4 times per week" },
  { value: "5", label: "5 times per week" },
];

export function QuoteSection() {
  const [formData, setFormData] = useState<QuoteFormData>({
    propertyType: "",
    totalCleanableSpace: "",
    carpetedArea: "",
    hardSurfaceArea: "",
    trashCans: "",
    glassWindowsDoors: "",
    toiletsUrinals: "",
    dispensers: "",
    cleaningFrequency: "",
  });
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedQuote = calculateQuote(formData);
    setQuoteResult(calculatedQuote);
  };

  const handleBookingConfirmed = (bookingDetails: BookingDetails) => {
    console.log('Booking confirmed:', bookingDetails);
    toast.success('Appointment booked successfully!');
    // You can add additional logic here, such as updating the UI or component state
  };

  return (
    <section id="quote" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Routine Cleaning Contract
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below to receive an estimated quote for our
            cleaning services.
          </p>
        </motion.div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Quote Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Type of Property
                </label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("propertyType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="totalCleanableSpace"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Total Cleanable Space (sq. ft.)
                </label>
                <Input
                  type="number"
                  id="totalCleanableSpace"
                  name="totalCleanableSpace"
                  value={formData.totalCleanableSpace}
                  onChange={handleInputChange}
                  placeholder="Enter total cleanable space"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="carpetedArea"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Carpeted Area (sq. ft.)
                </label>
                <Input
                  type="number"
                  id="carpetedArea"
                  name="carpetedArea"
                  value={formData.carpetedArea}
                  onChange={handleInputChange}
                  placeholder="Enter carpeted area"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="hardSurfaceArea"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Hard Surface Area Floors (sq. ft.)
                </label>
                <Input
                  type="number"
                  id="hardSurfaceArea"
                  name="hardSurfaceArea"
                  value={formData.hardSurfaceArea}
                  onChange={handleInputChange}
                  placeholder="Enter hard surface area"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="trashCans"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Number of Trash Cans
                </label>
                <Input
                  type="number"
                  id="trashCans"
                  name="trashCans"
                  value={formData.trashCans}
                  onChange={handleInputChange}
                  placeholder="Enter number of trash cans"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="glassWindowsDoors"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Number of Glass Windows/Doors
                </label>
                <Input
                  type="number"
                  id="glassWindowsDoors"
                  name="glassWindowsDoors"
                  value={formData.glassWindowsDoors}
                  onChange={handleInputChange}
                  placeholder="Enter number of glass windows/doors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="toiletsUrinals"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Number of Toilets/Urinals
                </label>
                <Input
                  type="number"
                  id="toiletsUrinals"
                  name="toiletsUrinals"
                  value={formData.toiletsUrinals}
                  onChange={handleInputChange}
                  placeholder="Enter number of toilets/urinals"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="dispensers"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Number of Dispensers to be Refilled
                </label>
                <Input
                  type="number"
                  id="dispensers"
                  name="dispensers"
                  value={formData.dispensers}
                  onChange={handleInputChange}
                  placeholder="Enter number of dispensers"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cleaningFrequency"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Cleaning Frequency
                </label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("cleaningFrequency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cleaning frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Calculate Quote
              </Button>
            </form>

            {quoteResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-4 bg-primary/10 rounded-md"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Estimated Monthly Quote
                </h3>
                <p className="text-2xl font-bold">
                  Total monthly: ${quoteResult.totalMonthly.toFixed(2)}
                </p>
                <p className="text-lg">
                  Based on {quoteResult.cleansPerWeek} clean(s) per week
                </p>
                <p className="text-lg">
                  Price per clean: ${quoteResult.perClean.toFixed(2)}
                </p>
                <p className="text-lg">
                  Total weekly: ${quoteResult.totalWeekly.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  This quote is an estimate for a month&apos;s worth of cleans
                  based on your selected frequency. It is subject to change
                  based on the final walkthrough. Any additional requirements
                  identified during the walkthrough will be incorporated into
                  the final official scope of work and may affect the final
                  cost.
                </p>
                <Button className="mt-4" onClick={() => setIsCalendlyOpen(true)}>
                  Book walk-through
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Calendly Inline Widget Modal */}
        <AnimatePresence>
          {isCalendlyOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-4 rounded-lg w-full max-w-[310px] m-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Schedule Walk-through for Precise Estimates</h2>
                  <button
                    onClick={() => setIsCalendlyOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                {/* <InlineWidget
                  url="https://calendly.com/admin-custosupreme/30min"
                  styles={{ height: "calc(100% - 60px)" }}
                /> */}
                <CustomCalendar onBookingConfirmed={handleBookingConfirmed} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateQuote } from '@/lib/QuoteCalculator';

export interface QuoteFormData {
  propertyType: string;
  totalCleanableSpace: string;
  carpetedArea: string;
  hardSurfaceArea: string;
  trashCans: string;
  highDustingArea: string;
  glassWindowsDoors: string;
  toiletsUrinals: string;
  dispensers: string;
  hardSurfacesToWipe: string;
}

const propertyTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'healthcare', label: 'Healthcare Facility' },
];

export function QuoteSection() {
  const [formData, setFormData] = useState<QuoteFormData>({
    propertyType: '',
    totalCleanableSpace: '',
    carpetedArea: '',
    hardSurfaceArea: '',
    trashCans: '',
    highDustingArea: '',
    glassWindowsDoors: '',
    toiletsUrinals: '',
    dispensers: '',
    hardSurfacesToWipe: '',
  });
  const [quoteResult, setQuoteResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, propertyType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedQuote = calculateQuote(formData);
    setQuoteResult(calculatedQuote);
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Get a Quote</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below to receive an estimated quote for our cleaning services.
          </p>
        </motion.div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Quote Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-foreground mb-1">
                  Type of Property
                </label>
                <Select onValueChange={handleSelectChange} value={formData.propertyType}>
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
                <label htmlFor="totalCleanableSpace" className="block text-sm font-medium text-foreground mb-1">
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
                <label htmlFor="carpetedArea" className="block text-sm font-medium text-foreground mb-1">
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
                <label htmlFor="hardSurfaceArea" className="block text-sm font-medium text-foreground mb-1">
                  Hard-Surfaced Area to be Mopped (sq. ft.)
                </label>
                <Input
                  type="number"
                  id="hardSurfaceArea"
                  name="hardSurfaceArea"
                  value={formData.hardSurfaceArea}
                  onChange={handleInputChange}
                  placeholder="Enter hard-surfaced area"
                  required
                />
              </div>

              <div>
                <label htmlFor="trashCans" className="block text-sm font-medium text-foreground mb-1">
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
                <label htmlFor="highDustingArea" className="block text-sm font-medium text-foreground mb-1">
                  High Dusting Area (sq. ft.)
                </label>
                <Input
                  type="number"
                  id="highDustingArea"
                  name="highDustingArea"
                  value={formData.highDustingArea}
                  onChange={handleInputChange}
                  placeholder="Enter high dusting area"
                  required
                />
              </div>

              <div>
                <label htmlFor="glassWindowsDoors" className="block text-sm font-medium text-foreground mb-1">
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
                <label htmlFor="toiletsUrinals" className="block text-sm font-medium text-foreground mb-1">
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
                <label htmlFor="dispensers" className="block text-sm font-medium text-foreground mb-1">
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
                <label htmlFor="hardSurfacesToWipe" className="block text-sm font-medium text-foreground mb-1">
                  Hard Surfaces to be Wiped (sq. ft.)
                </label>
                <Input
                  type="number"
                  id="hardSurfacesToWipe"
                  name="hardSurfacesToWipe"
                  value={formData.hardSurfacesToWipe}
                  onChange={handleInputChange}
                  placeholder="Enter hard surfaces to be wiped"
                  required
                />
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
                <h3 className="text-lg font-semibold mb-2">Estimated Quote</h3>
                <p className="text-2xl font-bold">${quoteResult.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This quote is an estimate and is subject to change based on the final walkthrough. 
                  Any additional requirements identified during the walkthrough will be incorporated 
                  into the final official scope of work and may affect the final cost.
                </p>
                <Button className="mt-4" onClick={() => alert("Walkthrough scheduling functionality to be implemented")}>
                  Schedule Walkthrough
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteFormData } from '@/components/QuoteSection';

interface QuoteData extends QuoteFormData {
  initialQuote: number;
  finalQuote?: number;
  walkthrough?: {
    date: string;
    notes: string;
  };
}

interface ScopeOfWorkProps {
  quoteData: QuoteData;
}

export function ScopeOfWork({ quoteData }: ScopeOfWorkProps) {
  const {
    propertyType,
    totalCleanableSpace,
    carpetedArea,
    hardSurfaceArea,
    trashCans,
    highDustingArea,
    glassWindowsDoors,
    toiletsUrinals,
    dispensers,
    hardSurfacesToWipe,
    initialQuote,
    finalQuote,
    walkthrough,
  } = quoteData;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Scope of Work</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          <p><strong>Type of Property:</strong> {propertyType}</p>
          <p><strong>Total Cleanable Space:</strong> {totalCleanableSpace} sq. ft.</p>

          <h3 className="text-lg font-semibold mt-6">Cleaning Tasks</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Vacuum {carpetedArea} sq. ft. of carpeted area</li>
            <li>Mop {hardSurfaceArea} sq. ft. of hard surface area</li>
            <li>Empty and clean {trashCans} trash cans</li>
            <li>Perform high dusting in {highDustingArea} sq. ft. area</li>
            <li>Clean {glassWindowsDoors} glass windows/doors</li>
            <li>Clean and sanitize {toiletsUrinals} toilets/urinals</li>
            <li>Refill {dispensers} dispensers</li>
            <li>Wipe and disinfect {hardSurfacesToWipe} sq. ft. of hard surfaces</li>
          </ul>

          {walkthrough && (
            <>
              <h3 className="text-lg font-semibold mt-6">Walkthrough Notes</h3>
              <p>{walkthrough.notes}</p>
            </>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Pricing</h3>
            <p><strong>Initial Quote:</strong> ${initialQuote.toFixed(2)}</p>
            {finalQuote && <p><strong>Final Quote:</strong> ${finalQuote.toFixed(2)}</p>}
          </div>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              This scope of work is based on the information provided and the walkthrough conducted. 
              The services listed above will be performed according to our standard cleaning procedures 
              and quality standards. Any additional services or special requirements not listed here 
              may incur additional charges.
            </p>
          </div>

          <div className="mt-6">
            <Button className="w-full">Accept and Schedule Cleaning</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
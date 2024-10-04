import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteFormData } from "@/components/QuoteSection";

interface QuoteData extends QuoteFormData {
  initialQuote: {
    perClean: number;
    totalWeekly: number;
    totalMonthly: number;
    cleansPerWeek: number;
  };
  finalQuote?: {
    perClean: number;
    totalWeekly: number;
    totalMonthly: number;
    cleansPerWeek: number;
  };
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
    glassWindowsDoors,
    toiletsUrinals,
    dispensers,
    cleaningFrequency,
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
          <p>
            <strong>Type of Property:</strong> {propertyType}
          </p>
          <p>
            <strong>Total Cleanable Space:</strong> {totalCleanableSpace} sq.
            ft.
          </p>

          <h3 className="text-lg font-semibold mt-6">Cleaning Tasks</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Vacuum {carpetedArea} sq. ft. of carpeted area</li>
            <li>Mop {hardSurfaceArea} sq. ft. of hard surface area</li>
            <li>Empty and clean {trashCans} trash cans</li>
            <li>Clean {glassWindowsDoors} glass windows/doors</li>
            <li>Clean and sanitize {toiletsUrinals} toilets/urinals</li>
            <li>Refill {dispensers} dispensers</li>
          </ul>

          <p>
            <strong>Cleaning Frequency:</strong> {cleaningFrequency} time(s) per
            week
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Initial Estimate</h3>
            <p>
              <strong>Price per clean:</strong> $
              {initialQuote.perClean.toFixed(2)}
            </p>
            <p>
              <strong>Total weekly:</strong> $
              {initialQuote.totalWeekly.toFixed(2)}
            </p>
            <p>
              <strong>Total monthly:</strong> $
              {initialQuote.totalMonthly.toFixed(2)}
            </p>
            <p>
              <strong>Cleans per week:</strong> {initialQuote.cleansPerWeek}
            </p>
          </div>

          {walkthrough && (
            <>
              <h3 className="text-lg font-semibold mt-6">Walkthrough Notes</h3>
              <p>{walkthrough.notes}</p>
            </>
          )}

          {finalQuote && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Final Quote</h3>
              <p>
                <strong>Price per clean:</strong> $
                {finalQuote.perClean.toFixed(2)}
              </p>
              <p>
                <strong>Total weekly:</strong> $
                {finalQuote.totalWeekly.toFixed(2)}
              </p>
              <p>
                <strong>Total monthly:</strong> $
                {finalQuote.totalMonthly.toFixed(2)}
              </p>
              <p>
                <strong>Cleans per week:</strong> {finalQuote.cleansPerWeek}
              </p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              {finalQuote
                ? "This final scope of work is based on the information provided and the walkthrough conducted. The services listed above will be performed according to our standard cleaning procedures and quality standards. Any additional services or special requirements not listed here may incur additional charges."
                : "This initial estimate is based on the information provided. A final quote will be prepared after a walkthrough is conducted. The final scope of work may include adjustments based on the walkthrough findings."}
            </p>
          </div>

          <div className="mt-6">
            {finalQuote ? (
              <Button className="w-full">Accept and Schedule Cleaning</Button>
            ) : (
              <Button className="w-full">Schedule Quote</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

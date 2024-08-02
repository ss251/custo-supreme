import { QuoteFormData } from '@/components/QuoteSection';

const LABOR_RATE = 30; // $30 per hour
const MATERIALS_COST = 4; // $4 for materials and equipment usage

export interface QuoteResult {
  perClean: number;
  totalWeekly: number;
  totalMonthly: number;
  cleansPerWeek: number;
}

export function calculateQuote(formData: QuoteFormData): QuoteResult {
  let totalMinutes = 0;

  // Vacuuming Carpeted Area
  totalMinutes += (parseFloat(formData.carpetedArea) || 0) / 1000 * 8; // Adjusted from 11 to 8 minutes per 1000 sq. ft.

  // Mopping Hard Surface Area (updated to 15 minutes)
  totalMinutes += (parseFloat(formData.hardSurfaceArea) || 0) / 1000 * 15; // Adjusted from 9 to 15 minutes per 1000 sq. ft.

  // Emptying Trash Cans
  totalMinutes += (parseInt(formData.trashCans) || 0) * 0.75; // Adjusted from 1 to 0.75 minutes per can

  // Cleaning Glass Windows/Doors (updated to 1.5 minutes)
  totalMinutes += (parseInt(formData.glassWindowsDoors) || 0) * 1.5; // Adjusted from 11.4 to 1.5 minutes per window/door

  // Cleaning Toilets/Urinals
  totalMinutes += (parseInt(formData.toiletsUrinals) || 0) * 6; // Adjusted from 14.75 to 6 minutes per fixture

  // Refilling Dispensers
  totalMinutes += (parseInt(formData.dispensers) || 0) * 0.5; // Adjusted from 1 to 0.5 minutes per dispenser

  // Convert minutes to hours
  const totalHours = totalMinutes / 60;

  // Calculate labor cost
  const laborCost = totalHours * LABOR_RATE;

  // Calculate total cost per clean
  const totalCostPerClean = laborCost + MATERIALS_COST;

  // Calculate number of cleans per week
  const cleansPerWeek = parseInt(formData.cleaningFrequency) || 1;

  // Calculate total weekly cost
  const totalWeekly = totalCostPerClean * cleansPerWeek;

  // Calculate total monthly cost (assuming 4 weeks per month)
  const totalMonthly = totalWeekly * 4;

  return {
    perClean: Math.round(totalCostPerClean * 100) / 100, // Round to 2 decimal places
    totalWeekly: Math.round(totalWeekly * 100) / 100, // Round to 2 decimal places
    totalMonthly: Math.round(totalMonthly * 100) / 100, // Round to 2 decimal places
    cleansPerWeek,
  };
}

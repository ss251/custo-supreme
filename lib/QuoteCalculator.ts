import { QuoteFormData } from '@/components/QuoteSection';

const LABOR_RATE = 25; // $25 per hour
const MATERIALS_COST = 50; // $50 for materials and equipment usage

export function calculateQuote(formData: QuoteFormData): number {
  let totalMinutes = 0;

  // Vacuuming Carpeted Area
  totalMinutes += (parseFloat(formData.carpetedArea) || 0) / 1000 * 11;

  // Mopping Hard-Surfaced Area
  totalMinutes += (parseFloat(formData.hardSurfaceArea) || 0) / 1000 * 10.8;

  // Emptying Trash Cans
  totalMinutes += (parseInt(formData.trashCans) || 0) * 1;

  // High Dusting
  totalMinutes += (parseFloat(formData.highDustingArea) || 0) / 150 * 3.15;

  // Cleaning Glass Windows/Doors
  totalMinutes += (parseInt(formData.glassWindowsDoors) || 0) * 11.4;

  // Cleaning Toilets/Urinals
  totalMinutes += (parseInt(formData.toiletsUrinals) || 0) * 14.75;

  // Refilling Dispensers
  totalMinutes += (parseInt(formData.dispensers) || 0) * 1;

  // Wiping Hard Surfaces
  totalMinutes += (parseFloat(formData.hardSurfacesToWipe) || 0) / 150 * 2.88;

  // Convert minutes to hours
  const totalHours = totalMinutes / 60;

  // Calculate labor cost
  const laborCost = totalHours * LABOR_RATE;

  // Calculate total cost
  const totalCost = laborCost + MATERIALS_COST;

  return Math.round(totalCost * 100) / 100; // Round to 2 decimal places
}
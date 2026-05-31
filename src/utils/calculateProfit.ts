import type { ProfitInput, ProfitResult } from '@/src/types';

export function calculateProfit(input: ProfitInput): ProfitResult {
  const fuelCost =
    input.distanceKm > 0 && input.averageConsumption > 0
      ? (input.distanceKm / input.averageConsumption) * input.dieselPrice
      : 0;

  const estimatedCost = fuelCost + input.toll + input.food + input.otherCosts;
  const netProfit = input.freightValue - estimatedCost;
  const profitPerKm = input.distanceKm > 0 ? netProfit / input.distanceKm : 0;

  return {
    estimatedCost,
    netProfit,
    profitPerKm,
  };
}

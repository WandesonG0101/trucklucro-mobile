type CalculateFreightProfitInput = {
  freightValue: number;
  distanceKm: number;
  truckConsumptionKmPerLiter: number;
  dieselPrice: number;
  tollValue: number;
  foodCost: number;
  otherCosts: number;
  anttMinimumValue?: number;
  historicalAverageValue?: number;
};

export type FreightProfitResult = {
  fuelCost: number;
  totalCost: number;
  netProfit: number;
  profitPerKm: number;
  differenceFromAntt: number | null;
  percentageFromAntt: number | null;
  differenceFromHistory: number | null;
  percentageFromHistory: number | null;
};

function calculateDifference(value: number, reference?: number) {
  if (!reference || reference <= 0) {
    return {
      difference: null,
      percentage: null,
    };
  }

  const difference = value - reference;

  return {
    difference,
    percentage: (difference / reference) * 100,
  };
}

export function calculateFreightProfit(input: CalculateFreightProfitInput): FreightProfitResult {
  const fuelCost =
    input.distanceKm > 0 && input.truckConsumptionKmPerLiter > 0
      ? (input.distanceKm / input.truckConsumptionKmPerLiter) * input.dieselPrice
      : 0;
  const totalCost = fuelCost + input.tollValue + input.foodCost + input.otherCosts;
  const netProfit = input.freightValue - totalCost;
  const profitPerKm = input.distanceKm > 0 ? netProfit / input.distanceKm : 0;
  const anttComparison = calculateDifference(input.freightValue, input.anttMinimumValue);
  const historyComparison = calculateDifference(input.freightValue, input.historicalAverageValue);

  return {
    fuelCost,
    totalCost,
    netProfit,
    profitPerKm,
    differenceFromAntt: anttComparison.difference,
    percentageFromAntt: anttComparison.percentage,
    differenceFromHistory: historyComparison.difference,
    percentageFromHistory: historyComparison.percentage,
  };
}

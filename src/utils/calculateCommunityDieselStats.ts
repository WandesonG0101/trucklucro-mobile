import type { CommunityDieselPrice } from '@/src/types';

export function calculateCommunityDieselStats(prices: CommunityDieselPrice[]) {
  if (prices.length === 0) {
    return {
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
      stationCount: 0,
    };
  }

  const values = prices.map((price) => price.pricePerLiter);
  const total = values.reduce((sum, value) => sum + value, 0);

  return {
    lowestPrice: Math.min(...values),
    highestPrice: Math.max(...values),
    averagePrice: total / values.length,
    stationCount: prices.length,
  };
}

export type Trip = {
  id: string;
  origin: string;
  destination: string;
  date: string;
  revenue: number;
  cost: number;
  distanceKm: number;
};

export type Freight = {
  id: string;
  origin: string;
  destination: string;
  value: number;
  distanceKm: number;
  vehicleType: string;
};

export type Partner = {
  id: string;
  name: string;
  category: string;
  benefit: string;
};

export type ProfitInput = {
  freightValue: number;
  distanceKm: number;
  averageConsumption: number;
  dieselPrice: number;
  toll: number;
  food: number;
  otherCosts: number;
};

export type ProfitResult = {
  estimatedCost: number;
  netProfit: number;
  profitPerKm: number;
};

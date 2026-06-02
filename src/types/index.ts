export type Trip = {
  id: string;
  origin: string;
  destination: string;
  date: string;
  revenue: number;
  cost: number;
  distanceKm: number;
  carrierName?: string;
  vehicleType?: string;
  vehicleModel?: string;
  cargoType?: string;
  expenses?: TripExpense[];
};

export type TripExpense = {
  id: string;
  category: string;
  description: string;
  value: number;
};

export type Freight = {
  id: string;
  origin: string;
  destination: string;
  value: number;
  distanceKm: number;
  vehicleType: string;
};

export type FreightAnalysisStatus = 'bom' | 'regular' | 'baixo' | 'a_combinar';

export type FreightOffer = {
  id: string;
  carrierName: string;
  carrierLogoText?: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  cargoType: string;
  vehicleTypes: string[];
  weightKg?: number;
  collectionDate: string;
  deliveryDate: string;
  freightValue: number | null;
  estimatedAnttMinimumValue: number;
  historicalAverageValue: number;
  tollValue: number | null;
  distanceKm?: number;
  status: 'Aberto' | 'Em negociacao' | 'Fechado';
  notes?: string;
};

export type FreightHistory = {
  originState: string;
  destinationState: string;
  cargoType: string;
  vehicleType: string;
  averageValue: number;
  averageValuePerKm: number;
  numberOfPreviousFreights: number;
};

export type FreightOfferAnalysis = {
  status: FreightAnalysisStatus;
  label: string;
  description: string;
  percentageAboveAntt: number | null;
  percentageVsHistory: number | null;
};

export type Partner = {
  id: string;
  name: string;
  category: string;
  benefit: string;
  description: string;
  discount: string;
  region: string;
  coupon: string;
  highlight: string;
  icon: string;
  color: string;
};

export type CommunityDieselPrice = {
  id: string;
  stationName: string;
  city: string;
  state: string;
  fuelType: 'S10' | 'Diesel comum';
  pricePerLiter: number;
  informedAt: string;
  informedBy: string;
  publishedDate: string;
  latitude: number | null;
  longitude: number | null;
};

export type AnpDieselReference = {
  state: string;
  stateName: string;
  updatedAt: string;
  dieselS10Average: number;
  dieselCommonAverage: number;
  sourceLabel: string;
};

export type AvailableDriver = {
  id: string;
  name: string;
  initials: string;
  city: string;
  state: string;
  vehicleType: string;
  bodyType?: string;
  description?: string;
  availableUntil: string;
  phone?: string;
  isCurrentUser?: boolean;
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

export type FreightCalculationParams = {
  freightId?: string;
  carrierName?: string;
  originCity?: string;
  originState?: string;
  destinationCity?: string;
  destinationState?: string;
  cargoType?: string;
  vehicleType?: string;
  distanceKm?: string;
  freightValue?: string;
  anttMinimumValue?: string;
  historicalAverageValue?: string;
  tollValue?: string;
  weightKg?: string;
  notes?: string;
};

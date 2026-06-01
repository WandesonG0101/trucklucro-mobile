import type { FreightHistory } from '@/src/types';

export const freightHistory: FreightHistory[] = [
  {
    originState: 'SP',
    destinationState: 'MG',
    cargoType: 'Carga Geral',
    vehicleType: 'Bitrem',
    averageValue: 7100,
    averageValuePerKm: 13.65,
    numberOfPreviousFreights: 18,
  },
  {
    originState: 'SP',
    destinationState: 'MG',
    cargoType: 'Alimentos secos',
    vehicleType: 'Truck Bau',
    averageValue: 7900,
    averageValuePerKm: 13.86,
    numberOfPreviousFreights: 11,
  },
  {
    originState: 'PR',
    destinationState: 'SP',
    cargoType: 'Carga paletizada',
    vehicleType: 'Truck',
    averageValue: 4550,
    averageValuePerKm: 11.1,
    numberOfPreviousFreights: 9,
  },
  {
    originState: 'GO',
    destinationState: 'MT',
    cargoType: 'Insumos agricolas',
    vehicleType: 'Bitrem',
    averageValue: 6900,
    averageValuePerKm: 7.75,
    numberOfPreviousFreights: 7,
  },
  {
    originState: 'SP',
    destinationState: 'SP',
    cargoType: 'Conteiner',
    vehicleType: 'Carreta 3 Eixos',
    averageValue: 6650,
    averageValuePerKm: 15.46,
    numberOfPreviousFreights: 14,
  },
];

import type { Freight } from '@/src/types';

export const freights: Freight[] = [
  {
    id: '1',
    origin: 'Araguaina - TO',
    destination: 'Palmas - TO',
    value: 3200,
    distanceKm: 385,
    vehicleType: 'Truck',
  },
  {
    id: '2',
    origin: 'Palmas - TO',
    destination: 'Gurupi - TO',
    value: 2400,
    distanceKm: 225,
    vehicleType: 'Truck Bau',
  },
  {
    id: '3',
    origin: 'Paraiso do Tocantins - TO',
    destination: 'Araguaina - TO',
    value: 2800,
    distanceKm: 315,
    vehicleType: 'Bitruck',
  },
];

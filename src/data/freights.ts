import type { Freight } from '@/src/types';

export const freights: Freight[] = [
  {
    id: '1',
    origin: 'Santos, SP',
    destination: 'Ribeirao Preto, SP',
    value: 3600,
    distanceKm: 430,
    vehicleType: 'Truck bau',
  },
  {
    id: '2',
    origin: 'Contagem, MG',
    destination: 'Vitoria, ES',
    value: 5200,
    distanceKm: 530,
    vehicleType: 'Carreta',
  },
  {
    id: '3',
    origin: 'Londrina, PR',
    destination: 'Cuiaba, MT',
    value: 8400,
    distanceKm: 1120,
    vehicleType: 'Bitrem',
  },
];

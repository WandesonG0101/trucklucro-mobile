import type { Trip } from '@/src/types';

export const trips: Trip[] = [
  {
    id: '1',
    origin: 'Campinas, SP',
    destination: 'Belo Horizonte, MG',
    date: '28/05/2026',
    revenue: 4200,
    cost: 2450,
    distanceKm: 590,
  },
  {
    id: '2',
    origin: 'Uberlandia, MG',
    destination: 'Goiania, GO',
    date: '24/05/2026',
    revenue: 3100,
    cost: 1680,
    distanceKm: 355,
  },
  {
    id: '3',
    origin: 'Curitiba, PR',
    destination: 'Sao Paulo, SP',
    date: '19/05/2026',
    revenue: 2800,
    cost: 1320,
    distanceKm: 410,
  },
];

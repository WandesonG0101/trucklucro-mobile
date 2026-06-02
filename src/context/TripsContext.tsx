import { createContext, type ReactNode, useContext, useState } from 'react';

import { trips as initialTrips } from '@/src/data';
import type { Trip, TripExpense } from '@/src/types';

type NewTrip = Omit<Trip, 'id'>;

type TripsContextValue = {
  trips: Trip[];
  addTrip: (trip: NewTrip) => void;
  addTripExpense: (tripId: string, expense: Omit<TripExpense, 'id'>) => void;
};

const TripsContext = createContext<TripsContextValue | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  function addTrip(trip: NewTrip) {
    setTrips((current) => [
      {
        ...trip,
        id: String(Date.now()),
      },
      ...current,
    ]);
  }

  function addTripExpense(tripId: string, expense: Omit<TripExpense, 'id'>) {
    setTrips((current) =>
      current.map((trip) => {
        if (trip.id !== tripId) {
          return trip;
        }

        const newExpense = {
          ...expense,
          id: String(Date.now()),
        };

        return {
          ...trip,
          cost: trip.cost + expense.value,
          expenses: [...(trip.expenses ?? []), newExpense],
        };
      }),
    );
  }

  return <TripsContext.Provider value={{ trips, addTrip, addTripExpense }}>{children}</TripsContext.Provider>;
}

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error('useTrips must be used within TripsProvider');
  }

  return context;
}

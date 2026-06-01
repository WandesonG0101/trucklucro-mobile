import { createContext, type ReactNode, useContext, useState } from 'react';

import type { AvailableDriver } from '@/src/types';

type AvailabilityContextValue = {
  currentUserAvailabilities: AvailableDriver[];
  publishAvailability: (driver: AvailableDriver) => void;
};

const AvailabilityContext = createContext<AvailabilityContextValue | null>(null);

export function AvailabilityProvider({ children }: { children: ReactNode }) {
  const [currentUserAvailabilities, setCurrentUserAvailabilities] = useState<AvailableDriver[]>([]);

  function publishAvailability(driver: AvailableDriver) {
    // TODO: substituir por persistência em API/AsyncStorage quando o backend estiver disponível.
    setCurrentUserAvailabilities((current) => [
      driver,
      ...current.filter((item) => !item.isCurrentUser),
    ]);
  }

  return (
    <AvailabilityContext.Provider value={{ currentUserAvailabilities, publishAvailability }}>
      {children}
    </AvailabilityContext.Provider>
  );
}

export function useAvailability() {
  const context = useContext(AvailabilityContext);

  if (!context) {
    throw new Error('useAvailability must be used within AvailabilityProvider');
  }

  return context;
}

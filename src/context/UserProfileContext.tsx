import { createContext, type ReactNode, useContext, useState } from 'react';

type PersonalData = {
  fullName: string;
  nickname: string;
};

type VehicleData = {
  truckType: string;
  brand: string;
  model: string;
};

type UserProfileContextValue = {
  personalData: PersonalData;
  vehicleData: VehicleData;
  updatePersonalData: (data: Partial<PersonalData>) => void;
  updateVehicleData: (data: Partial<VehicleData>) => void;
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

const initialPersonalData: PersonalData = {
  fullName: '',
  nickname: '',
};

const initialVehicleData: VehicleData = {
  truckType: '',
  brand: '',
  model: '',
};

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [personalData, setPersonalData] = useState(initialPersonalData);
  const [vehicleData, setVehicleData] = useState(initialVehicleData);

  function updatePersonalData(data: Partial<PersonalData>) {
    setPersonalData((current) => ({ ...current, ...data }));
  }

  function updateVehicleData(data: Partial<VehicleData>) {
    setVehicleData((current) => ({ ...current, ...data }));
  }

  return (
    <UserProfileContext.Provider
      value={{ personalData, vehicleData, updatePersonalData, updateVehicleData }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }

  return context;
}

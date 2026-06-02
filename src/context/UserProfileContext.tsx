import { createContext, type ReactNode, useContext, useState } from 'react';

type PersonalData = {
  fullName: string;
  nickname: string;
  phone: string;
  invitationCode: string;
};

type VehicleData = {
  id: string;
  truckType: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
  capacity: string;
};

type UserProfileContextValue = {
  personalData: PersonalData;
  vehicleData: VehicleData;
  vehicles: VehicleData[];
  updatePersonalData: (data: Partial<PersonalData>) => void;
  updateVehicleData: (data: Partial<VehicleData>) => void;
  addVehicle: (data: Omit<VehicleData, 'id'>) => void;
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

const initialPersonalData: PersonalData = {
  fullName: '',
  nickname: '',
  phone: '',
  invitationCode: 'TRUCKLUCRO10',
};

const initialVehicleData: VehicleData = {
  id: 'principal',
  truckType: '',
  brand: '',
  model: '',
  year: '',
  plate: '',
  capacity: '',
};

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [personalData, setPersonalData] = useState(initialPersonalData);
  const [vehicleData, setVehicleData] = useState(initialVehicleData);
  const [vehicles, setVehicles] = useState<VehicleData[]>([initialVehicleData]);

  function updatePersonalData(data: Partial<PersonalData>) {
    setPersonalData((current) => ({ ...current, ...data }));
  }

  function updateVehicleData(data: Partial<VehicleData>) {
    setVehicleData((current) => {
      const updatedVehicle = { ...current, ...data };
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle)),
      );

      return updatedVehicle;
    });
  }

  function addVehicle(data: Omit<VehicleData, 'id'>) {
    const newVehicle = {
      ...data,
      id: String(Date.now()),
    };

    setVehicles((current) => [...current, newVehicle]);
  }

  return (
    <UserProfileContext.Provider
      value={{ personalData, vehicleData, vehicles, updatePersonalData, updateVehicleData, addVehicle }}>
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

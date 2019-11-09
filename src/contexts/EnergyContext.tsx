import React, { createContext } from "react";
import useEnergy, { EnergyData, initialEnergyData } from '../hooks/useEnergy';

const EnergyContext = createContext<EnergyData>(initialEnergyData);

export const useEnergyContext = () => {
  const context = React.useContext(EnergyContext)
  if (!context) {
    throw new Error('Cannot use `useEnergyContext` outside a EnergyProvider')
  }
  return context
}

export const EnergyContextProvider = props => {
  const value = useEnergy()
  return (
    <EnergyContext.Provider value={value} {...props} />
  );
}

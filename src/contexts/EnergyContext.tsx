import React, { createContext, useState, useEffect } from "react";

type Fuel = 'biomass' | 'coal' | 'imports' | 'gas' | 'nuclear' | 'other' | 'hydro' | 'solar' | 'wind';

 export interface GenerationMix {
  fuel: Fuel;
  perc: number;
}

interface EnergyData {
  from: string
  to: string
  generationmix: GenerationMix[]
}

interface EnergyContext {
  data: EnergyData
  error: Error
  loading: boolean
}

export const EnergyContext = createContext<EnergyContext>({ data: null, error: null, loading: false });

export const EnergyContextProvider = ({ children }) => {
  const [data, updateData] = useState<EnergyData>(null);
  const [error, updateError] = useState<Error>(null);
  const [loading, updateLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      updateLoading(true);
      try {
        const fetched = await fetch('https://api.carbonintensity.org.uk/generation');
        const { data } = await fetched.json();
        updateData(data);
        updateError(null);
      } catch (error) {
        console.error('Error:', error);
        updateError(error);
      }
      updateLoading(false);
    })();
  }, []);

  return (
    <EnergyContext.Provider value={{ error, data, loading }}>
      {children}
    </EnergyContext.Provider>
  );
}

import React from 'react';
import { EnergyContextProvider } from '../../contexts/EnergyContext';
import EnergyStatsWrapper from '../../components/EnergyStatsWrapper';

const Main: React.FunctionComponent = () => (
  <EnergyContextProvider>
    <EnergyStatsWrapper />
  </EnergyContextProvider>
)

export default Main

import React from 'react';
import { EnergyContextProvider } from '../../contexts/EnergyContext';
import EnergyStatsWrapper from '../../components/EnergyStatsWrapper';

export default () => (
  <EnergyContextProvider>
    <EnergyStatsWrapper />
  </EnergyContextProvider>
)

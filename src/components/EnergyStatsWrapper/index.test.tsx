import React from 'react'
import { render, cleanup } from '@testing-library/react';
import * as energyContext from '../../contexts/EnergyContext'
import { EnergyData } from '../../hooks/useEnergy';
import EnergyStatBox from '../EnergyStatBox';
import EnergyStatsWrapper from '.';

jest.mock('../EnergyStatBox', () => jest.fn().mockReturnValue(<div data-testid="energyStatBox">EnergyStatBox</div>))

describe('<EnergyStatsWrapper />', () => {

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  const contextData: EnergyData = {
    data: {
      from: 'yesterday',
      to: 'tomorrow',
      generationmix: [{fuel: 'biomass', perc: 34}, {fuel: 'nuclear', perc: 12}]
    },
    loading: false,
    error: null,
    fetchData: jest.fn()
  }

  it('renders EnergyStatBox components correctly when data is present', () => {
    jest.spyOn(energyContext, 'useEnergyContext').mockReturnValue(contextData)
    const { getAllByTestId } = render(<EnergyStatsWrapper />)
    expect(getAllByTestId('energyStatBox').length).toBe(2)
    expect(EnergyStatBox).toHaveBeenNthCalledWith(1, {
      generation: contextData.data.generationmix[0],
      animationIndex: 0
    }, {})
    expect(EnergyStatBox).toHaveBeenNthCalledWith(2, {
      generation: contextData.data.generationmix[1],
      animationIndex: 1
    }, {})
  })

  it('does not render EnergyStatBox components when data is null', () => {
    jest.spyOn(energyContext, 'useEnergyContext').mockReturnValue({...contextData, data: null})
    const { queryByTestId } = render(<EnergyStatsWrapper />)
    expect(queryByTestId('energyStatBox')).toBeNull()
  })

  it('calls fetchData() upon mounting', () => {
    jest.spyOn(energyContext, 'useEnergyContext').mockReturnValue(contextData)
    render(<EnergyStatsWrapper />)
    expect(contextData.fetchData).toHaveBeenCalledTimes(1)
  })

})

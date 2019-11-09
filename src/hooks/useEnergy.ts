import React from 'react'
import axios from 'axios'

type Fuel = 'biomass' | 'coal' | 'imports' | 'gas' | 'nuclear' | 'other' | 'hydro' | 'solar' | 'wind'

export interface GenerationMix {
  fuel: Fuel
  perc: number
}

interface GenerationData {
  from: string
  to: string
  generationmix: GenerationMix[]
}

export interface EnergyData {
  data: GenerationData
  error: Error
  loading: boolean
  fetchData(): Promise<void>
}

export const initialEnergyData: EnergyData = { data: null, error: null, loading: false, fetchData: null };

export default function(): EnergyData {
  const [data, updateData] = React.useState<GenerationData>(null)
  const [error, updateError] = React.useState<Error>(null)
  const [loading, updateLoading] = React.useState<boolean>(false)
  const fetchData = async () => {
    updateLoading(true)
    try {
      const response = await axios.get<Pick<EnergyData, 'data'>>('https://api.carbonintensity.org.uk/generation')
      updateData(response.data.data)
      updateError(null)
    } catch (error) {
      console.error('Error:', error)
      updateError(error)
    }
    updateLoading(false)
  }

  return {
    data,
    error,
    loading,
    fetchData
  }
}

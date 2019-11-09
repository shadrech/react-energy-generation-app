import React, { useEffect } from "react";
import { Wrapper } from "./styles";
import EnergyStatBox from "../EnergyStatBox";
import { useEnergyContext } from '../../contexts/EnergyContext';

const EnergyStatsWrapper: React.FunctionComponent = () => {
  const { data, loading, error, fetchData } = useEnergyContext()

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      {data && data.generationmix.map((generation, index) =>
        <EnergyStatBox
          key={`${generation.fuel}${generation.perc}`}
          generation={generation}
          animationIndex={index} />
      )}
    </Wrapper>
  )
}

export default EnergyStatsWrapper;

import React, { useContext } from "react";
import { EnergyContext } from "../../contexts/EnergyContext";
import { Wrapper } from "./styles";
import EnergyStatBox from "../EnergyStatBox";

export default () => {
  const { data, loading, error } = useContext(EnergyContext);

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

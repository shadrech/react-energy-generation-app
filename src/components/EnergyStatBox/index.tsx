import React from 'react'
import CountUp from 'react-countup'
import { VictoryPie } from "victory"
import { StatBox, ChartWrapper, TextWrapper } from './styles'
import { GenerationMix } from '../../hooks/useEnergy';

interface Props {
  generation: GenerationMix
  animationIndex?: number
}

const EnergyStatBox: React.FunctionComponent<Props> = ({ generation: { perc, fuel }, animationIndex }) => {
  const animationDelay = animationIndex ? (animationIndex * 0.3) + 1 : 0;
  return (
    <StatBox animationIndex={animationIndex}>
      <ChartWrapper>
        <svg style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" >
            <stop offset="0%" stopColor="rgb(49,214,231)" />
            <stop offset="39%" stopColor="rgb(49,214,231)" />
            <stop offset="100%" stopColor="rgb(188,135,252)" />
            </linearGradient>
          </defs>
        </svg>
        <VictoryPie
          data={[
            { y: perc },
            { y: 100 - perc }
          ]}
          colorScale={[
            'url(#lgrad)',
            '#f4f5f9'
          ]}
          labels={[]}
          innerRadius={180}
        />
        <p>
          <CountUp end={Math.round(perc)} delay={animationDelay} />%
        </p>
      </ChartWrapper>
      <TextWrapper>
          <h1>
            <CountUp end={perc} delay={animationDelay} decimals={1} />
          </h1>
          <h2>{`${fuel[0].toUpperCase()}${fuel.slice(1)}`}</h2>
      </TextWrapper>
    </StatBox>
  )
}

export default EnergyStatBox

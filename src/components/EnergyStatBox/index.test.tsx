import React from 'react'
import { render } from '@testing-library/react'
import wait from 'waait'
import EnergyStatBox from '.'
import { StatBox } from './styles';
import { GenerationMix } from '../../hooks/useEnergy'

const statBoxId = (StatBox as any).styledComponentId

describe('<EnergyStatBox />', () => {

  const generation: GenerationMix = {
    fuel: 'hydro',
    perc: 17
  }

  it('renders correctly as component animates in', async () => {
    const { container } = render(<EnergyStatBox generation={generation} />)
    expect(container).toMatchSnapshot()
    await wait(2000)
    expect(container).toMatchSnapshot()
  })

  it('adds a animation delay if animationIndex prop provided', () => {
    const { container } = render(<EnergyStatBox generation={generation} animationIndex={2} />)
    const statBox = container.getElementsByClassName(statBoxId)[0]
    expect(statBox).toHaveStyle('animation-delay: 0.6s')
  })

  it('does not add a animation delay if animationIndex prop not provided', () => {
    const { container } = render(<EnergyStatBox generation={generation} />)
    const statBox = container.getElementsByClassName(statBoxId)[0]
    expect(statBox).toHaveStyle('animation-delay: 0s')
  })

})

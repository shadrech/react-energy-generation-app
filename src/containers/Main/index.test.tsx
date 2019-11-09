import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Main from '.'

jest.mock('../../components/EnergyStatsWrapper', () => jest.fn().mockReturnValue(<div>EnergyStatsWrapper</div>))
jest.mock('../../contexts/EnergyContext', () => ({
  EnergyContextProvider: jest.fn().mockImplementation(props => <div data-test-id="context-provider" {...props} />)
}))

describe('<Main />', () => {

  afterEach(cleanup)

  it('renders as expected', () => {
    const { container } = render(<Main />)
    expect(container).toMatchSnapshot()
  })

})

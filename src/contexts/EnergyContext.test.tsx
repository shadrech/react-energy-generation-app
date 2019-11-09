import React from 'react'
import { render, fireEvent, cleanup } from "@testing-library/react"
import { EnergyContextProvider, useEnergyContext } from './EnergyContext'

const mockedHookData = {
  data: null,
  error: null,
  loading: false,
  fetchData: jest.fn()
}
jest.mock('../hooks/useEnergy', () => jest.fn().mockImplementation(() => mockedHookData))

const TestComponent = () => {
  const values = useEnergyContext()
  return <div data-testid="test" onClick={values.fetchData}>{JSON.stringify(values)}</div>
}

describe('Contexts - EnergyContext', () => {

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('useEnergyContext provides correct data when wrapped around EnergyContextProvider', () => {
    const { getByTestId } = render(<TestComponent />, { wrapper: EnergyContextProvider })
    fireEvent.click(getByTestId('test'))
    expect(mockedHookData.fetchData).toHaveBeenCalledTimes(1)
    expect(getByTestId('test').innerHTML).toEqual('{"data":null,"error":null,"loading":false}')
  })

  it('useEnergyContext throws an when not wrapped around EnergyContextProvider', () => {
    expect(() => render(<TestComponent />)).toThrowError('Cannot use `useEnergyContext` outside a EnergyProvider')
  })

})

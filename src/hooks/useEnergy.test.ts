import React from 'react'
import axios from 'axios'
import useEnergy from './useEnergy'

const apiResponse = require('../../example_api_response.json')

const mockedDataHook = [null, jest.fn()]
const mockedErrorHook = [null, jest.fn()]
const mockedLoadingHook = [false, jest.fn()]

describe('Hooks - useEnergy', () => {

  beforeEach(() => {
    jest.spyOn(<any> React, 'useState').mockImplementationOnce(() => mockedDataHook)
    jest.spyOn(<any> React, 'useState').mockImplementationOnce(() => mockedErrorHook)
    jest.spyOn(<any> React, 'useState').mockImplementationOnce(() => mockedLoadingHook)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('initializes all hooks with correct default values and returns correct data', () => {
    const values = useEnergy()
    expect(React.useState).toHaveBeenNthCalledWith(1, null)
    expect(React.useState).toHaveBeenNthCalledWith(2, null)
    expect(React.useState).toHaveBeenNthCalledWith(3, false)
    expect(values).toEqual({
      data: null,
      loading: false,
      error: null,
      fetchData: expect.any(Function)
    })
  })

  describe('fetchData()', () => {

    it('correctly handles a successful api response', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: apiResponse
      })
      const { fetchData } = useEnergy()
      await fetchData()
      expect(mockedLoadingHook[1]).toHaveBeenCalledWith(true)
      expect(axios.get).toHaveBeenCalledWith('https://api.carbonintensity.org.uk/generation')
      expect(mockedDataHook[1]).toHaveBeenCalledWith(apiResponse.data)
      expect(mockedErrorHook[1]).toHaveBeenCalledWith(null)
      expect(mockedLoadingHook[1]).toHaveBeenCalledWith(false)
    })

    it('correctly handles an erroneous api response', async () => {
      const error = new Error('aaw shucks')
      jest.spyOn(axios, 'get').mockRejectedValue(error)
      const { fetchData } = useEnergy()
      await fetchData()
      expect(mockedLoadingHook[1]).toHaveBeenCalledWith(true)
      expect(axios.get).toHaveBeenCalledWith('https://api.carbonintensity.org.uk/generation')
      expect(mockedDataHook[1]).not.toHaveBeenCalled()
      expect(mockedErrorHook[1]).toHaveBeenCalledWith(error)
      expect(mockedLoadingHook[1]).toHaveBeenCalledWith(false)
    })

  })

})

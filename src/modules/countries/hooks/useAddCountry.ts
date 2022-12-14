import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { addOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { COUNTRIES_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { COUNTRY_LIST_QUERY } from '../constants/queryKeys'
import { ICountry, ICountryInfo } from '../types/country'

const addCountry = async (country: ICountry): Promise<ICountry> => {
  const { data } = await ApiService.post<AxiosResponse>(
    COUNTRIES_CRUD_ENDPOINT,
    country,
  )
  return data as unknown as ICountry
}

export function useAddCountry(): ICountryInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addCountry, {
    onSuccess: (country: ICountry) => {
      queryClient.setQueryData<ICountry[]>(
        [COUNTRY_LIST_QUERY],
        (oldCountries) => addOne(oldCountries, country),
      )
    },
  })

  return { isAdding: isLoading, addCountry: mutateAsync }
}

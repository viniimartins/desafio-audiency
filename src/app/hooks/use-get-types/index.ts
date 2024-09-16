import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { api } from '@/services/api'

export interface TypePokemon {
  name: string
  url: string
}

interface TypePokemonResponse {
  results: TypePokemon[]
}

async function get() {
  const { data } = await api.get<TypePokemonResponse>('/type')

  return data
}

export function useGetTypes() {
  const query = useQuery({
    queryKey: ['get-types'],
    queryFn: get,
    select: (response) => response.results,
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error(
        'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
        {
          toastId: 'get-pokemon',
        },
      )
    }
  }, [isError])

  return { ...query }
}

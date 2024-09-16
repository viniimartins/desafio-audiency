import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { api } from '@/services/api'

interface Pokemon {
  name: string
  url: string
}

interface TypeResponse {
  pokemon: Pokemon[]
}

async function get() {
  const { data } = await api.get<TypeResponse>('/type/fire')

  return data
}

export function useGetPokemon() {
  const query = useQuery({
    queryKey: ['get-pokemon'],
    queryFn: get,
    select: (response) => response.pokemon,
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

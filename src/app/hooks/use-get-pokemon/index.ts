import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { api } from '@/services/api'

interface Props {
  typePokemon: string | undefined
}

export interface Pokemon {
  name: string
  url: string
}

interface PokemonSlot {
  slot: number
  pokemon: Pokemon
}

interface TypeResponse {
  pokemon: PokemonSlot[]
}

async function get(typePokemon: Props['typePokemon']) {
  const { data } = await api.get<TypeResponse>(`/type/${typePokemon}`)

  return data
}

export function useGetPokemon({ typePokemon }: Props) {
  const query = useQuery({
    queryKey: ['get-pokemon', typePokemon],
    queryFn: () => get(typePokemon),
    select: (response) => response.pokemon,
    enabled: !!typePokemon,
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

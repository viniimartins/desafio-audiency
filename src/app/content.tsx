'use client'
import { Layout, Select, Table } from 'antd'
import { useState } from 'react'

import { Pokemon, useGetPokemon } from './hooks/use-get-pokemon'
import { TypePokemon, useGetTypes } from './hooks/use-get-types'

const { Content } = Layout

interface TablePokemon {
  key: string
  type: string | undefined
  name: string
}

export function ContentComponent() {
  const [typePokemonSelected, setTypePokemonSelected] =
    useState<TypePokemon['name']>()

  const { data: typesPokemons, isFetching: isFetchingTypesPokemons } =
    useGetTypes()

  const { data: pokemons, isFetching: isFetchingPokemons } = useGetPokemon({
    typePokemon: typePokemonSelected,
  })

  const dataSource: TablePokemon[] =
    pokemons?.map((pokemon, index) => ({
      key: index.toString(),
      type: typePokemonSelected,
      ...pokemon,
    })) || []

  const columns = [
    {
      title: 'Nome',
      dataIndex: ['pokemon', 'name'],
      key: 'name',
      width: 155,
      render: (text: Pokemon['name']) =>
        text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render: (text: TypePokemon['name']) =>
        text.charAt(0).toUpperCase() + text.slice(1),
    },
  ]

  return (
    <Content className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl space-y-4 p-10">
      <div className="flex w-full justify-end">
        <Select
          placeholder="Escolha a categoria"
          className="w-full"
          onChange={setTypePokemonSelected}
          loading={isFetchingTypesPokemons}
        >
          {typesPokemons?.map((types, index) => {
            const { name } = types

            return (
              <Select.Option key={index} value={name}>
                {name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="overflow-x-auto">
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isFetchingPokemons}
          scroll={{ x: 600, y: 600 }}
        />
      </div>
    </Content>
  )
}

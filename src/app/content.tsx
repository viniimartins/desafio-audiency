'use client'
import { Button, Layout, Modal, Select, Table } from 'antd'
import { useEffect, useState } from 'react'

import { useModal } from '@/hooks/use-modal'

import { Pokemon, useGetPokemon } from './hooks/use-get-pokemon'
import { TypePokemon, useGetTypes } from './hooks/use-get-types'

const { Content } = Layout

interface TablePokemon {
  key: string
  type: string | undefined
  pokemon: Pokemon
}

export function ContentComponent() {
  const { actions, isOpen } = useModal()

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
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
  ]

  const handleSelectTypeChange = (value: TypePokemon['name']) => {
    setTypePokemonSelected(value)
    actions.close()
  }

  useEffect(() => {
    actions.open()
  }, [])

  return (
    <>
      <Content className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl space-y-4 p-10">
        <div className="flex w-full justify-end">
          <Button onClick={actions.open}>Filtro</Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={isFetchingPokemons}
            rootClassName="capitalize"
            scroll={{ x: 600, y: 600 }}
          />
        </div>
      </Content>

      <Modal
        title="Categoria do Pokémon"
        open={isOpen}
        onCancel={actions.close}
        footer={false}
      >
        <Select
          placeholder="Escolha a categoria"
          className="w-full"
          onChange={handleSelectTypeChange}
          loading={isFetchingTypesPokemons}
          rootClassName="capitalize"
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
      </Modal>
    </>
  )
}

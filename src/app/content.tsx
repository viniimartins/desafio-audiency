'use client'
import { Layout, Select, Table } from 'antd'

import { useGetPokemon } from './hooks/use-get-pokemon'

const { Content } = Layout

export function ContentComponent() {
  const { data: pokemons, isFetching } = useGetPokemon()

  const columns = [
    {
      title: 'Name',
      dataIndex: ['pokemon', 'name'],
      key: 'name',
    },
  ]

  return (
    <Content className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl space-y-4 p-10">
      <div className="flex w-full justify-end">
        <Select placeholder="Escolha seu pokemon">
          <Select.Option value="sample">Sample</Select.Option>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <Table
          dataSource={pokemons}
          columns={columns}
          loading={isFetching}
          scroll={{ x: 'max-content', y: 600 }}
          rowKey={(record) => record.name}
        />
      </div>
    </Content>
  )
}

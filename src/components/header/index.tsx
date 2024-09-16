'use client'

import { Layout } from 'antd'

const { Header } = Layout

export function HeaderComponent() {
  return (
    <Header className="flex items-center justify-center">
      <span className="text-2xl font-semibold text-white">Pokémon</span>
    </Header>
  )
}

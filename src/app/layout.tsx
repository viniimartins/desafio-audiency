import '@/styles/globals.css'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata } from 'next'

import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: 'Pokémon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  )
}

'use client'

import { type PropsWithChildren } from 'react'
import React from 'react'

import { ReactQueryProvider } from './react-query'
import ToastifyProvider from './toastify'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      {children}
      <ToastifyProvider />
    </ReactQueryProvider>
  )
}

import { useState } from 'react'

import { ModalHookData } from '@/types/modal'

export const useModal = <T>(): ModalHookData<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const actions = {
    close: () => {
      setIsOpen(false)
    },
    open: () => {
      setIsOpen(true)
    },
    toggle: () => setIsOpen((currentState) => !currentState),
  }

  return {
    isOpen,
    actions,
  }
}

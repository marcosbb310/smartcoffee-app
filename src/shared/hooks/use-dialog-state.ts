import { useState } from 'react';

/**
 * Custom hook for managing dialog state with optional selected item tracking
 * @param initialOpen - Initial open state, defaults to false
 * @returns Object with dialog state and control functions
 */
export const useDialogState = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  return {
    isOpen,
    setIsOpen,
    selectedId,
    setSelectedId,
    open: (id?: string) => {
      if (id) setSelectedId(id);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setSelectedId(null);
    }
  };
};

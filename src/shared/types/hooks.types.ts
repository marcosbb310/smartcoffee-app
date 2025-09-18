/**
 * Types for custom hooks
 */

export interface UseDialogStateReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  open: (id?: string) => void;
  close: () => void;
}

export interface UseSearchFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  clearFilters: () => void;
}

export interface UseFormReturn<T> {
  values: T;
  setValues: (values: T) => void;
  errors: Partial<Record<keyof T, string>>;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  isValid: boolean;
  reset: () => void;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  setError: <K extends keyof T>(key: K, error: string) => void;
  clearError: <K extends keyof T>(key: K) => void;
}

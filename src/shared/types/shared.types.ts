/**
 * Shared types used across the application
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchableEntity extends BaseEntity {
  name: string;
  description?: string;
}

export interface PricedEntity extends SearchableEntity {
  price: number;
  cost?: number;
}

export interface InventoryEntity extends BaseEntity {
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
}

export interface DialogState {
  isOpen: boolean;
  selectedId: string | null;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

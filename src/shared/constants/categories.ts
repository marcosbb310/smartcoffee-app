/**
 * Category constants for the application
 */

export const PRODUCT_CATEGORIES = [
  'Coffee',
  'Tea',
  'Pastries',
  'Sandwiches',
  'Salads',
  'Soups',
  'Beverages',
  'Snacks'
] as const;

export const INGREDIENT_CATEGORIES = [
  'Coffee Beans',
  'Milk & Dairy',
  'Sweeteners',
  'Flavors',
  'Toppings',
  'Bread & Pastries',
  'Vegetables',
  'Meat & Protein',
  'Condiments',
  'Other'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
export type IngredientCategory = typeof INGREDIENT_CATEGORIES[number];

/**
 * Calculate price with peak hour multiplier
 * @param basePrice - The base price of the item
 * @param multiplier - The peak hour multiplier
 * @returns The calculated price with multiplier applied
 */
export const calculatePeakPrice = (basePrice: number, multiplier: number): number => {
  return Math.round(basePrice * multiplier * 100) / 100; // Round to 2 decimal places
};

/**
 * Format price for display
 * @param price - The price to format
 * @param currency - The currency symbol, defaults to '$'
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency = '$'): string => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * Calculate total price for multiple items
 * @param items - Array of items with price and quantity
 * @returns Total price
 */
export const calculateTotalPrice = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (basic US format)
 * @param phone - Phone string to validate
 * @returns boolean indicating if phone is valid
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate required field
 * @param value - Value to validate
 * @returns boolean indicating if value is not empty
 */
export const isRequired = (value: string | number | undefined | null): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== undefined && value !== null;
};

/**
 * Validate price range
 * @param price - Price to validate
 * @param min - Minimum price
 * @param max - Maximum price
 * @returns boolean indicating if price is within range
 */
export const isValidPriceRange = (price: number, min: number, max: number): boolean => {
  return price >= min && price <= max;
};

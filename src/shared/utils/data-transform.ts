/**
 * Convert recipes object to array format for easier manipulation
 * @param recipesObj - Object with productId as keys and recipe items as values
 * @returns Array of recipe items with additional metadata
 */
export const convertRecipesToArray = (recipesObj: { [productId: string]: any[] }) => {
  const recipeArray: Array<any & { productId: string; id: string; isOptional?: boolean }> = [];
  Object.entries(recipesObj).forEach(([productId, recipeItems]) => {
    recipeItems.forEach((item, index) => {
      recipeArray.push({
        ...item,
        productId,
        id: `${productId}-${item.ingredientId}-${index}`,
        isOptional: false
      });
    });
  });
  return recipeArray;
};

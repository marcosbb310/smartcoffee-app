// Inventory Management Types
export interface Ingredient {
  id: string;
  name: string;
  unit: string; // "ml", "g", "cups", "pieces"
  currentStock: number;
  minStock: number; // Reorder threshold
  maxStock: number; // Maximum storage capacity
  costPerUnit: number;
  supplier: string;
  shelfLife: number; // days
  category: "dairy" | "coffee" | "sweetener" | "pastry" | "other";
  lastRestocked: Date;
  expirationDate?: Date;
  isActive: boolean;
}

export interface Recipe {
  id: string;
  productId: string;
  ingredientId: string;
  quantity: number; // How much of this ingredient (in ingredient's unit)
  isOptional: boolean; // For variations like "extra shot"
  notes?: string;
}

export interface InventoryTransaction {
  id: string;
  ingredientId: string;
  type: "sale" | "restock" | "waste" | "adjustment" | "expired";
  quantity: number; // positive for restock, negative for sale/waste
  timestamp: Date;
  productId?: string; // For sales
  reason?: string; // For waste/adjustments
  cost?: number; // For restock transactions
}

export interface ReorderRule {
  id: string;
  ingredientId: string;
  triggerType: "stock_level" | "time_based" | "demand_forecast";
  threshold: number; // Stock level or days ahead
  reorderQuantity: number;
  supplier: string;
  leadTime: number; // days
  isActive: boolean;
  lastTriggered?: Date;
}

export interface InventoryAlert {
  id: string;
  type: "low_stock" | "reorder_needed" | "expiring_soon" | "overstocked";
  ingredientId: string;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  isResolved: boolean;
}

export interface WastePreventionRule {
  id: string;
  productId: string;
  ingredientId: string;
  lowStockThreshold: number; // percentage of normal stock
  priceReductionPercent: number; // how much to reduce price
  isActive: boolean;
}

// Sample data for development
export const sampleIngredients: Ingredient[] = [
  {
    id: "milk-whole",
    name: "Whole Milk",
    unit: "ml",
    currentStock: 5000,
    minStock: 1000,
    maxStock: 10000,
    costPerUnit: 0.001, // $0.001 per ml
    supplier: "Local Dairy Co.",
    shelfLife: 7,
    category: "dairy",
    lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    isActive: true,
  },
  {
    id: "espresso-beans",
    name: "Espresso Beans",
    unit: "g",
    currentStock: 2000,
    minStock: 500,
    maxStock: 5000,
    costPerUnit: 0.05, // $0.05 per gram
    supplier: "Coffee Roasters Inc.",
    shelfLife: 30,
    category: "coffee",
    lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    expirationDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
    isActive: true,
  },
  {
    id: "sugar-white",
    name: "White Sugar",
    unit: "g",
    currentStock: 1000,
    minStock: 200,
    maxStock: 2000,
    costPerUnit: 0.002, // $0.002 per gram
    supplier: "Bulk Foods Ltd.",
    shelfLife: 365,
    category: "sweetener",
    lastRestocked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    isActive: true,
  },
];

export const sampleRecipes: Recipe[] = [
  {
    id: "espresso-recipe",
    productId: "1", // Espresso
    ingredientId: "espresso-beans",
    quantity: 18, // 18g of beans per espresso
    isOptional: false,
  },
  {
    id: "cappuccino-milk",
    productId: "2", // Cappuccino
    ingredientId: "milk-whole",
    quantity: 150, // 150ml of milk
    isOptional: false,
  },
  {
    id: "cappuccino-espresso",
    productId: "2", // Cappuccino
    ingredientId: "espresso-beans",
    quantity: 18, // 18g of beans
    isOptional: false,
  },
  {
    id: "latte-milk",
    productId: "3", // Latte
    ingredientId: "milk-whole",
    quantity: 250, // 250ml of milk
    isOptional: false,
  },
  {
    id: "latte-espresso",
    productId: "3", // Latte
    ingredientId: "espresso-beans",
    quantity: 18, // 18g of beans
    isOptional: false,
  },
];

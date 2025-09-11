export interface Ingredient {
  id: string;
  name: string;
  unit: 'kg' | 'g' | 'L' | 'ml' | 'pieces' | 'cups' | 'tbsp' | 'tsp';
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  costPerUnit: number;
  supplier: string;
  expiryDate?: Date;
  category: 'coffee' | 'milk' | 'syrup' | 'topping' | 'pastry' | 'other';
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  category: 'beverage' | 'food' | 'pastry';
  isActive: boolean;
  recipe: RecipeItem[];
}

export interface RecipeItem {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactInfo: string;
  deliveryTime: number; // in days
  minimumOrder: number;
  isActive: boolean;
}

export interface InventoryAlert {
  id: string;
  type: 'low_stock' | 'expiring_soon' | 'out_of_stock' | 'overstock';
  ingredientId: string;
  ingredientName: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  isRead: boolean;
}

export interface AutoOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  items: AutoOrderItem[];
  totalCost: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
  expectedDelivery: Date;
}

export interface AutoOrderItem {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
}

export interface ExpiryPricing {
  ingredientId: string;
  ingredientName: string;
  daysUntilExpiry: number;
  priceReductionPercentage: number;
  isActive: boolean;
}

export interface SmartInventorySettings {
  enabled: boolean;
  autoOrdering: boolean;
  expiryPricing: boolean;
  alertSettings: {
    lowStockThreshold: number; // percentage
    expiryWarningDays: number;
    enableNotifications: boolean;
  };
  pricingSettings: {
    expiryReductionSteps: ExpiryPricing[];
  };
}

// Sample data for demonstration
export const sampleIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Espresso Beans",
    unit: "kg",
    currentStock: 2.5,
    minStockLevel: 5.0,
    maxStockLevel: 20.0,
    costPerUnit: 15.99,
    supplier: "Coffee Supply Co",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    category: "coffee"
  },
  {
    id: "2",
    name: "Whole Milk",
    unit: "L",
    currentStock: 8.0,
    minStockLevel: 10.0,
    maxStockLevel: 50.0,
    costPerUnit: 1.25,
    supplier: "Dairy Direct",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    category: "milk"
  },
  {
    id: "3",
    name: "Vanilla Syrup",
    unit: "L",
    currentStock: 0.8,
    minStockLevel: 2.0,
    maxStockLevel: 10.0,
    costPerUnit: 8.50,
    supplier: "Flavor World",
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    category: "syrup"
  },
  {
    id: "4",
    name: "Oat Milk",
    unit: "L",
    currentStock: 12.0,
    minStockLevel: 5.0,
    maxStockLevel: 25.0,
    costPerUnit: 2.50,
    supplier: "Plant Based Co",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: "milk"
  },
  {
    id: "5",
    name: "Chocolate Syrup",
    unit: "L",
    currentStock: 1.2,
    minStockLevel: 2.0,
    maxStockLevel: 8.0,
    costPerUnit: 7.99,
    supplier: "Flavor World",
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    category: "syrup"
  },
  {
    id: "6",
    name: "Croissants",
    unit: "pieces",
    currentStock: 15,
    minStockLevel: 20,
    maxStockLevel: 50,
    costPerUnit: 1.50,
    supplier: "Bakery Fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    category: "pastry"
  }
];

export const sampleRecipes: { [productId: string]: RecipeItem[] } = {
  "1": [ // Espresso
    { ingredientId: "1", ingredientName: "Espresso Beans", quantity: 0.02, unit: "kg" }
  ],
  "2": [ // Cappuccino
    { ingredientId: "1", ingredientName: "Espresso Beans", quantity: 0.02, unit: "kg" },
    { ingredientId: "2", ingredientName: "Whole Milk", quantity: 0.15, unit: "L" }
  ],
  "3": [ // Latte
    { ingredientId: "1", ingredientName: "Espresso Beans", quantity: 0.02, unit: "kg" },
    { ingredientId: "2", ingredientName: "Whole Milk", quantity: 0.25, unit: "L" }
  ],
  "4": [ // Vanilla Latte
    { ingredientId: "1", ingredientName: "Espresso Beans", quantity: 0.02, unit: "kg" },
    { ingredientId: "2", ingredientName: "Whole Milk", quantity: 0.25, unit: "L" },
    { ingredientId: "3", ingredientName: "Vanilla Syrup", quantity: 0.02, unit: "L" }
  ],
  "5": [ // Oat Milk Latte
    { ingredientId: "1", ingredientName: "Espresso Beans", quantity: 0.02, unit: "kg" },
    { ingredientId: "4", ingredientName: "Oat Milk", quantity: 0.25, unit: "L" }
  ],
  "6": [ // Mocha
    { ingredientId: "1", ingredientName: "Espresso Beans", quantity: 0.02, unit: "kg" },
    { ingredientId: "2", ingredientName: "Whole Milk", quantity: 0.20, unit: "L" },
    { ingredientId: "5", ingredientName: "Chocolate Syrup", quantity: 0.03, unit: "L" }
  ],
  "7": [ // Croissant
    { ingredientId: "6", ingredientName: "Croissants", quantity: 1, unit: "pieces" }
  ]
};
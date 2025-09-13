import { 
  Ingredient, 
  Recipe, 
  InventoryTransaction, 
  ReorderRule, 
  InventoryAlert,
  WastePreventionRule 
} from '@/lib/types/inventory';

// POS Integration Types
interface POSProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  isActive: boolean;
  lastUpdated: Date;
}

interface POSSale {
  id: string;
  productId: string;
  quantity: number;
  timestamp: Date;
  price: number;
}

interface POSConnection {
  system: 'toast' | 'square' | 'clover' | 'other';
  isConnected: boolean;
  locationId: string;
  lastSync: Date;
  apiKey?: string;
  apiSecret?: string;
}

export class InventoryService {
  private ingredients: Ingredient[] = [];
  private recipes: Recipe[] = [];
  private transactions: InventoryTransaction[] = [];
  private reorderRules: ReorderRule[] = [];
  private wastePreventionRules: WastePreventionRule[] = [];
  private posConnection: POSConnection = {
    system: 'toast',
    isConnected: true,
    locationId: 'LOC_12345',
    lastSync: new Date(),
  };
  private posProducts: POSProduct[] = [];
  private posSales: POSSale[] = [];

  constructor() {
    this.loadSampleData();
    this.loadPOSData();
  }

  private loadSampleData() {
    // This would typically load from a database
    // For now, we'll use the sample data
  }

  private loadPOSData() {
    // Sample POS products (would come from POS API)
    this.posProducts = [
      {
        id: "1",
        name: "Espresso",
        price: 3.50,
        category: "Coffee",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "2",
        name: "Cappuccino",
        price: 4.25,
        category: "Coffee",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "3",
        name: "Latte",
        price: 4.75,
        category: "Coffee",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "4",
        name: "Americano",
        price: 3.75,
        category: "Coffee",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "5",
        name: "Mocha",
        price: 5.25,
        category: "Coffee",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "6",
        name: "Macchiato",
        price: 4.50,
        category: "Coffee",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "7",
        name: "Frappuccino",
        price: 5.75,
        category: "Cold Drinks",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "8",
        name: "Cold Brew",
        price: 4.00,
        category: "Cold Drinks",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "9",
        name: "Green Tea Latte",
        price: 5.25,
        category: "Tea",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "10",
        name: "Chai Latte",
        price: 4.95,
        category: "Tea",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "11",
        name: "Iced Coffee",
        price: 3.50,
        category: "Cold Drinks",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "12",
        name: "Hot Chocolate",
        price: 4.25,
        category: "Beverages",
        isActive: true,
        lastUpdated: new Date(),
      },
      {
        id: "13",
        name: "Smoothie Bowl",
        price: 7.50,
        category: "Food",
        isActive: true,
        lastUpdated: new Date(),
      },
    ];
  }

  // POS Integration Methods
  async syncWithPOS(): Promise<boolean> {
    try {
      // Simulate API call to POS system
      console.log(`Syncing with ${this.posConnection.system} POS...`);
      
      // Update last sync time
      this.posConnection.lastSync = new Date();
      
      // In a real implementation, this would:
      // 1. Fetch products from POS API
      // 2. Fetch recent sales from POS API
      // 3. Update local inventory based on sales
      // 4. Send updated prices back to POS
      
      return true;
    } catch (error) {
      console.error('POS sync failed:', error);
      return false;
    }
  }

  async updatePOSPrices(): Promise<boolean> {
    try {
      // Simulate sending updated prices to POS
      console.log('Updating POS prices...');
      
      for (const product of this.posProducts) {
        // Calculate smart pricing
        const wastePrevention = this.getWastePreventionPricing(product.id);
        const isPeakHour = this.isPeakHour();
        
        let newPrice = product.price;
        
        // Apply peak hour pricing
        if (isPeakHour) {
          newPrice *= 1.15; // 15% increase during peak hours
        }
        
        // Apply waste prevention pricing
        if (wastePrevention > 0) {
          newPrice *= (1 - wastePrevention / 100);
        }
        
        // Update product price
        product.price = newPrice;
        product.lastUpdated = new Date();
      }
      
      return true;
    } catch (error) {
      console.error('POS price update failed:', error);
      return false;
    }
  }

  private isPeakHour(): boolean {
    const hour = new Date().getHours();
    return (hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14) || (hour >= 17 && hour <= 19);
  }

  // Process a sale from POS system
  processPOSSale(sale: POSSale): void {
    // Record the sale
    this.posSales.push(sale);
    
    // Process inventory consumption
    this.processSale(sale.productId, sale.quantity);
    
    // Update pricing if needed
    this.updatePOSPrices();
  }

  // Get POS connection status
  getPOSConnectionStatus() {
    return {
      ...this.posConnection,
      productsSynced: this.posProducts.length,
      lastSale: this.posSales[this.posSales.length - 1]?.timestamp || null,
    };
  }

  // Get recent sales from POS
  getRecentPOSSales(limit: number = 10): POSSale[] {
    return this.posSales
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Get POS products
  getPOSProducts(): POSProduct[] {
    return this.posProducts;
  }

  // Calculate how much of an ingredient is consumed when a product is sold
  calculateIngredientConsumption(productId: string, quantity: number): Map<string, number> {
    const consumption = new Map<string, number>();
    
    const productRecipes = this.recipes.filter(recipe => recipe.productId === productId);
    
    for (const recipe of productRecipes) {
      const totalConsumption = recipe.quantity * quantity;
      const currentConsumption = consumption.get(recipe.ingredientId) || 0;
      consumption.set(recipe.ingredientId, currentConsumption + totalConsumption);
    }
    
    return consumption;
  }

  // Process a sale and update inventory
  processSale(productId: string, quantity: number): void {
    const consumption = this.calculateIngredientConsumption(productId, quantity);
    
    for (const [ingredientId, consumedAmount] of consumption) {
      // Update ingredient stock
      const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        ingredient.currentStock -= consumedAmount;
        
        // Record transaction
        const transaction: InventoryTransaction = {
          id: `txn-${Date.now()}-${Math.random()}`,
          ingredientId,
          type: 'sale',
          quantity: -consumedAmount,
          timestamp: new Date(),
          productId,
        };
        this.transactions.push(transaction);
        
        // Check for low stock alerts
        this.checkLowStockAlert(ingredient);
      }
    }
  }

  // Check if ingredient needs reordering
  checkReorderNeeded(ingredient: Ingredient): boolean {
    const reorderRule = this.reorderRules.find(rule => 
      rule.ingredientId === ingredient.id && rule.isActive
    );
    
    if (!reorderRule) return false;
    
    switch (reorderRule.triggerType) {
      case 'stock_level':
        return ingredient.currentStock <= reorderRule.threshold;
      case 'time_based':
        const daysSinceLastRestock = Math.floor(
          (Date.now() - ingredient.lastRestocked.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceLastRestock >= reorderRule.threshold;
      case 'demand_forecast':
        // This would use historical data to predict when stock will run out
        return this.forecastStockDepletion(ingredient) <= reorderRule.threshold;
      default:
        return false;
    }
  }

  // Forecast when stock will be depleted based on historical consumption
  private forecastStockDepletion(ingredient: Ingredient): number {
    // Get consumption data from last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentTransactions = this.transactions.filter(txn => 
      txn.ingredientId === ingredient.id && 
      txn.type === 'sale' && 
      txn.timestamp >= sevenDaysAgo
    );
    
    const totalConsumption = recentTransactions.reduce((sum, txn) => sum + Math.abs(txn.quantity), 0);
    const dailyAverage = totalConsumption / 7;
    
    if (dailyAverage === 0) return Infinity; // No consumption data
    
    return Math.floor(ingredient.currentStock / dailyAverage);
  }

  // Check for low stock alerts
  private checkLowStockAlert(ingredient: Ingredient): void {
    const stockPercentage = (ingredient.currentStock / ingredient.maxStock) * 100;
    
    if (stockPercentage <= 20) { // 20% or less
      const alert: InventoryAlert = {
        id: `alert-${Date.now()}-${Math.random()}`,
        type: 'low_stock',
        ingredientId: ingredient.id,
        message: `${ingredient.name} is running low (${Math.round(stockPercentage)}% remaining)`,
        severity: stockPercentage <= 10 ? 'critical' : 'high',
        timestamp: new Date(),
        isResolved: false,
      };
      
      // In a real app, this would be stored in database and sent to user
      console.log('Inventory Alert:', alert);
    }
  }

  // Get waste prevention pricing adjustment
  getWastePreventionPricing(productId: string): number {
    const productRecipes = this.recipes.filter(recipe => recipe.productId === productId);
    let totalReduction = 0;
    let applicableRules = 0;
    
    for (const recipe of productRecipes) {
      const ingredient = this.ingredients.find(ing => ing.id === recipe.ingredientId);
      const wasteRule = this.wastePreventionRules.find(rule => 
        rule.productId === productId && 
        rule.ingredientId === recipe.ingredientId && 
        rule.isActive
      );
      
      if (ingredient && wasteRule) {
        const stockPercentage = (ingredient.currentStock / ingredient.maxStock) * 100;
        
        if (stockPercentage <= wasteRule.lowStockThreshold) {
          totalReduction += wasteRule.priceReductionPercent;
          applicableRules++;
        }
      }
    }
    
    // Return average reduction percentage
    return applicableRules > 0 ? totalReduction / applicableRules : 0;
  }

  // Restock an ingredient
  restockIngredient(ingredientId: string, quantity: number, cost: number): void {
    const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
    if (ingredient) {
      ingredient.currentStock += quantity;
      ingredient.lastRestocked = new Date();
      
      // Record transaction
      const transaction: InventoryTransaction = {
        id: `txn-${Date.now()}-${Math.random()}`,
        ingredientId,
        type: 'restock',
        quantity,
        timestamp: new Date(),
        cost,
      };
      this.transactions.push(transaction);
    }
  }

  // Get inventory status for dashboard
  getInventoryStatus() {
    const lowStockItems = this.ingredients.filter(ing => 
      (ing.currentStock / ing.maxStock) * 100 <= 20
    );
    
    const reorderNeeded = this.ingredients.filter(ing => 
      this.checkReorderNeeded(ing)
    );
    
    const expiringSoon = this.ingredients.filter(ing => 
      ing.expirationDate && 
      ing.expirationDate.getTime() - Date.now() <= 3 * 24 * 60 * 60 * 1000 // 3 days
    );
    
    return {
      totalIngredients: this.ingredients.length,
      lowStockItems: lowStockItems.length,
      reorderNeeded: reorderNeeded.length,
      expiringSoon: expiringSoon.length,
      totalValue: this.ingredients.reduce((sum, ing) => 
        sum + (ing.currentStock * ing.costPerUnit), 0
      ),
    };
  }

  // Get ingredients that need reordering
  getReorderSuggestions(): Array<{
    ingredient: Ingredient;
    suggestedQuantity: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }> {
    const suggestions: Array<{
      ingredient: Ingredient;
      suggestedQuantity: number;
      urgency: 'low' | 'medium' | 'high' | 'critical';
    }> = [];
    
    for (const ingredient of this.ingredients) {
      if (this.checkReorderNeeded(ingredient)) {
        const reorderRule = this.reorderRules.find(rule => 
          rule.ingredientId === ingredient.id && rule.isActive
        );
        
        if (reorderRule) {
          const stockPercentage = (ingredient.currentStock / ingredient.maxStock) * 100;
          let urgency: 'low' | 'medium' | 'high' | 'critical' = 'low';
          
          if (stockPercentage <= 5) urgency = 'critical';
          else if (stockPercentage <= 10) urgency = 'high';
          else if (stockPercentage <= 15) urgency = 'medium';
          
          suggestions.push({
            ingredient,
            suggestedQuantity: reorderRule.reorderQuantity,
            urgency,
          });
        }
      }
    }
    
    return suggestions.sort((a, b) => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });
  }
}

// Singleton instance
export const inventoryService = new InventoryService();

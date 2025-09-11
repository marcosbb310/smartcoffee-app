"use client"

import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  Plus,
  Settings,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Checkbox } from "@/app/components/ui/checkbox";
import { sampleIngredients, sampleRecipes, SmartInventorySettings, RecipeItem } from "@/lib/types/inventory";
import { inventoryService } from "@/lib/services/inventory";
import { SmartInventoryDialog } from "@/app/components/smart-inventory-dialog";
import { Switch } from "@/app/components/ui/switch";
import { useState, useEffect } from "react";

export default function InventoryManagement() {
  const [inventoryStatus, setInventoryStatus] = useState(inventoryService.getInventoryStatus());
  const [reorderSuggestions, setReorderSuggestions] = useState(inventoryService.getReorderSuggestions());
  const [ingredients, setIngredients] = useState(sampleIngredients);
  // Convert sampleRecipes object to array format
  const convertRecipesToArray = (recipesObj: { [productId: string]: any[] }) => {
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

  const [recipes, setRecipes] = useState(convertRecipesToArray(sampleRecipes));

  // Tab state
  const [activeTab, setActiveTab] = useState("inventory");

  // Configuration modals state
  const [reorderConfigOpen, setReorderConfigOpen] = useState(false);
  const [recipeEditorOpen, setRecipeEditorOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Smart Inventory state
  const [smartInventoryDialogOpen, setSmartInventoryDialogOpen] = useState(false);
  const [smartInventorySettings, setSmartInventorySettings] = useState<SmartInventorySettings>({
    enabled: false,
    autoOrdering: false,
    expiryPricing: false,
    alertSettings: {
      lowStockThreshold: 20,
      expiryWarningDays: 3,
      enableNotifications: true
    },
    pricingSettings: {
      expiryReductionSteps: []
    }
  });

  // State for add ingredient dialog
  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    category: "Coffee",
    unit: "g",
    currentStock: "",
    minStock: "",
    maxStock: "",
    costPerUnit: "",
    supplier: "",
    status: "active"
  });

  const getStockStatus = (ingredient: any) => {
    const percentage = (ingredient.currentStock / ingredient.maxStock) * 100;
    if (percentage <= 10) return { status: "critical", color: "text-black" };
    if (percentage <= 20) return { status: "low", color: "text-black" };
    if (percentage <= 50) return { status: "medium", color: "text-black" };
    return { status: "good", color: "text-black" };
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "text-black";
      case "high": return "text-black";
      case "medium": return "text-black";
      default: return "text-black";
    }
  };

  const handleRestock = (ingredientId: string, quantity: number) => {
    inventoryService.restockIngredient(ingredientId, quantity, 0);
    setInventoryStatus(inventoryService.getInventoryStatus());
    setReorderSuggestions(inventoryService.getReorderSuggestions());
  };

  // Handle add ingredient
  const handleAddIngredient = () => {
    if (!newIngredient.name.trim() || !newIngredient.currentStock || !newIngredient.minStock || !newIngredient.maxStock || !newIngredient.costPerUnit) {
      return; // Basic validation
    }
    
    const currentStock = parseFloat(newIngredient.currentStock);
    const minStock = parseFloat(newIngredient.minStock);
    const maxStock = parseFloat(newIngredient.maxStock);
    const costPerUnit = parseFloat(newIngredient.costPerUnit);
    
    // Validate stock ranges
    if (minStock >= maxStock || currentStock < minStock || currentStock > maxStock) {
      return; // Invalid stock ranges
    }
    
    const ingredient = {
      id: Math.max(...ingredients.map(i => i.id)) + 1,
      name: newIngredient.name.trim(),
      category: newIngredient.category,
      unit: newIngredient.unit,
      currentStock: currentStock,
      minStock: minStock,
      maxStock: maxStock,
      costPerUnit: costPerUnit,
      supplier: newIngredient.supplier.trim(),
      status: newIngredient.status,
      lastUpdated: "Just now"
    };
    
    // Add the ingredient to the state
    setIngredients(prev => [...prev, ingredient]);
    
    // Reset form and close dialog
    setNewIngredient({
      name: "",
      category: "Coffee",
      unit: "g",
      currentStock: "",
      minStock: "",
      maxStock: "",
      costPerUnit: "",
      supplier: "",
      status: "active"
    });
    setIsAddIngredientOpen(false);
  };

  const handleSaveSmartInventorySettings = (settings: SmartInventorySettings) => {
    setSmartInventorySettings(settings);
    console.log("Smart inventory settings saved:", settings);
  };

  const resetAddIngredientForm = () => {
    setNewIngredient({
      name: "",
      category: "Coffee",
      unit: "g",
      currentStock: "",
      minStock: "",
      maxStock: "",
      costPerUnit: "",
      supplier: "",
      status: "active"
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">
              Track ingredients and manage automatic reordering
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Smart Inventory Toggle - Compact */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Switch
                id="smart-inventory"
                checked={smartInventorySettings.enabled}
                onCheckedChange={(checked) => 
                  setSmartInventorySettings(prev => ({ ...prev, enabled: checked }))
                }
                className="scale-75"
              />
              <Label htmlFor="smart-inventory" className="text-xs">
                Smart
              </Label>
            </div>
            
            {/* Smart Inventory Settings Button - Compact */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSmartInventoryDialogOpen(true)}
              className="h-8 px-2 text-xs"
            >
              <Settings className="w-3 h-3 mr-1" />
              Config
            </Button>

            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Dialog open={isAddIngredientOpen} onOpenChange={setIsAddIngredientOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Ingredient</DialogTitle>
                  <DialogDescription>
                    Add a new ingredient to your inventory with stock and supplier information.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ingredient-name">Ingredient Name *</Label>
                        <Input
                          id="ingredient-name"
                          placeholder="e.g., Oat Milk"
                          value={newIngredient.name}
                          onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ingredient-category">Category *</Label>
                        <Select
                          value={newIngredient.category}
                          onValueChange={(value) => setNewIngredient(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Coffee">Coffee</SelectItem>
                            <SelectItem value="Dairy">Dairy</SelectItem>
                            <SelectItem value="Syrups">Syrups</SelectItem>
                            <SelectItem value="Toppings">Toppings</SelectItem>
                            <SelectItem value="Bakery">Bakery</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-black">Stock Management</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-stock">Current Stock *</Label>
                        <Input
                          id="current-stock"
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="25.5"
                          value={newIngredient.currentStock}
                          onChange={(e) => setNewIngredient(prev => ({ ...prev, currentStock: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-stock">Min Stock *</Label>
                        <Input
                          id="min-stock"
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="5.0"
                          value={newIngredient.minStock}
                          onChange={(e) => setNewIngredient(prev => ({ ...prev, minStock: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-stock">Max Stock *</Label>
                        <Input
                          id="max-stock"
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="50.0"
                          value={newIngredient.maxStock}
                          onChange={(e) => setNewIngredient(prev => ({ ...prev, maxStock: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={newIngredient.unit}
                          onValueChange={(value) => setNewIngredient(prev => ({ ...prev, unit: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="g">Grams (g)</SelectItem>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="L">Liters (L)</SelectItem>
                            <SelectItem value="ml">Milliliters (ml)</SelectItem>
                            <SelectItem value="pcs">Pieces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cost-per-unit">Cost per Unit ($) *</Label>
                        <Input
                          id="cost-per-unit"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="12.50"
                          value={newIngredient.costPerUnit}
                          onChange={(e) => setNewIngredient(prev => ({ ...prev, costPerUnit: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input
                          id="supplier"
                          placeholder="e.g., Local Supplier"
                          value={newIngredient.supplier}
                          onChange={(e) => setNewIngredient(prev => ({ ...prev, supplier: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ingredient-status">Status</Label>
                        <Select
                          value={newIngredient.status}
                          onValueChange={(value) => setNewIngredient(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="low">Low Stock</SelectItem>
                            <SelectItem value="out">Out of Stock</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={resetAddIngredientForm}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddIngredientOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddIngredient}
                    disabled={!newIngredient.name.trim() || !newIngredient.currentStock || !newIngredient.minStock || !newIngredient.maxStock || !newIngredient.costPerUnit}
                  >
                    Add Ingredient
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Status Overview */}
            <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStatus.totalIngredients}</div>
              <p className="text-xs text-muted-foreground">
                Active ingredients tracked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{inventoryStatus.lowStockItems}</div>
              <p className="text-xs text-muted-foreground">
                Items need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${inventoryStatus.totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Current stock value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients List */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>
              Track individual ingredients and their current stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ingredients.map((ingredient) => {
                const stockStatus = getStockStatus(ingredient);
                const stockPercentage = (ingredient.currentStock / ingredient.maxStock) * 100;
                
                return (
                  <div key={ingredient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{ingredient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ingredient.currentStock} {ingredient.unit} remaining
                        </p>
                        <div className="w-32 rounded-full h-2 mt-1" style={{ backgroundColor: '#e6eaf7' }}>
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${Math.min(stockPercentage, 100)}%`,
                              backgroundColor: '#2c4170'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>
                        {stockStatus.status}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${(ingredient.currentStock * ingredient.costPerUnit).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">value</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            {/* Recipe Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Recipes</CardTitle>
                    <CardDescription>
                      Define how much of each ingredient goes into each product
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRecipeEditorOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Manage Recipes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      Bulk Import
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipes.map((recipe) => {
                    const ingredient = ingredients.find(ing => ing.id === recipe.ingredientId);
                    return (
                      <div key={recipe.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              Product #{recipe.productId} - {ingredient?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {recipe.quantity} {ingredient?.unit} {recipe.isOptional ? '(optional)' : '(required)'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={recipe.isOptional ? "secondary" : "default"}>
                            {recipe.isOptional ? "Optional" : "Required"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Recipe Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Recipe Builder</CardTitle>
                <CardDescription>
                  Add or edit recipes for individual products quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Select Product</Label>
                      <Select onValueChange={setSelectedProductId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a product to edit recipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Espresso</SelectItem>
                          <SelectItem value="2">Cappuccino</SelectItem>
                          <SelectItem value="3">Latte</SelectItem>
                          <SelectItem value="4">Americano</SelectItem>
                          <SelectItem value="5">Mocha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Recipe Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="espresso">Espresso Base</SelectItem>
                          <SelectItem value="milk-drink">Milk Drink</SelectItem>
                          <SelectItem value="iced-drink">Iced Drink</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {selectedProductId && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Recipe for Product #{selectedProductId}</h4>
                      <div className="space-y-3">
                        {ingredients.slice(0, 5).map((ingredient) => (
                          <div key={ingredient.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Package className="w-4 h-4" />
                              <span className="font-medium">{ingredient.name}</span>
                              <span className="text-sm text-muted-foreground">({ingredient.unit})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-20"
                              />
                              <Checkbox />
                              <span className="text-xs text-muted-foreground">Required</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">Save Recipe</Button>
                        <Button variant="outline" size="sm">Copy from Similar</Button>
                        <Button variant="outline" size="sm">Reset</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            {/* Reorder Suggestions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-black" />
                    <span>Reorder Suggestions</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReorderConfigOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configure Rules
                  </Button>
                </div>
                <CardDescription>
                  Items that need to be reordered to maintain stock levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reorderSuggestions.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-black mx-auto mb-4" />
                      <h3 className="text-lg font-medium">All Good!</h3>
                      <p className="text-muted-foreground">No reorders needed at this time.</p>
                    </div>
                  ) : (
                    reorderSuggestions.map((suggestion) => (
                      <div key={suggestion.ingredient.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">{suggestion.ingredient.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Current: {suggestion.ingredient.currentStock} {suggestion.ingredient.unit}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Suggested: {suggestion.suggestedQuantity} {suggestion.ingredient.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>
                            {suggestion.urgency}
                          </Badge>
                          <Button 
                            size="sm"
                            onClick={() => handleRestock(suggestion.ingredient.id, suggestion.suggestedQuantity)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Reorder
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Auto-Order Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-black" />
                  <span>Upcoming Auto-Orders</span>
                </CardTitle>
                <CardDescription>
                  Preview of orders the system will place based on current settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No Auto-Orders Scheduled</h3>
                    <p className="text-muted-foreground">
                      The system will automatically place orders when ingredients reach low stock levels.
                    </p>
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">How Auto-Ordering Works:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 text-left">
                        <li>• Monitors stock levels in real-time</li>
                        <li>• Calculates usage based on recent sales</li>
                        <li>• Places orders 3 days before stock runs out</li>
                        <li>• Considers supplier lead times and safety buffers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reorder Configuration Modal */}
        <Dialog open={reorderConfigOpen} onOpenChange={setReorderConfigOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Configure Reorder Rules</DialogTitle>
              <DialogDescription>
                Set parameters for when and how much to reorder ingredients
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">Low Stock Threshold (%)</Label>
                  <Input
                    id="low-stock-threshold"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="20"
                    placeholder="20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Trigger reorder when stock falls below this percentage
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reorder-lead-time">Reorder Lead Time (days)</Label>
                  <Input
                    id="reorder-lead-time"
                    type="number"
                    min="0"
                    defaultValue="3"
                    placeholder="3"
                  />
                  <p className="text-xs text-muted-foreground">
                    How many days before stock runs out to place orders
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="safety-buffer">Safety Stock Buffer (%)</Label>
                  <Input
                    id="safety-buffer"
                    type="number"
                    min="0"
                    max="50"
                    defaultValue="10"
                    placeholder="10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Extra stock to maintain as a buffer
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setReorderConfigOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setReorderConfigOpen(false)}>
                Save Configuration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Recipe Editor Modal */}
        <Dialog open={recipeEditorOpen} onOpenChange={setRecipeEditorOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Manage Product Recipes</DialogTitle>
              <DialogDescription>
                Configure how much of each ingredient goes into each product
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Select Product</Label>
                  <Select onValueChange={setSelectedProductId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a product to edit recipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Espresso</SelectItem>
                      <SelectItem value="2">Cappuccino</SelectItem>
                      <SelectItem value="3">Latte</SelectItem>
                      <SelectItem value="4">Americano</SelectItem>
                      <SelectItem value="5">Mocha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedProductId && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Recipe for Product #{selectedProductId}</h4>
                    <div className="space-y-3">
                      {ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Package className="w-4 h-4" />
                            <span className="font-medium">{ingredient.name}</span>
                            <span className="text-sm text-muted-foreground">({ingredient.unit})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className="w-20"
                            />
                            <Checkbox />
                            <span className="text-xs text-muted-foreground">Required</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setRecipeEditorOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setRecipeEditorOpen(false)}>
                Save Recipe
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Smart Inventory Dialog */}
        <SmartInventoryDialog
          open={smartInventoryDialogOpen}
          onOpenChange={setSmartInventoryDialogOpen}
          onSave={handleSaveSmartInventorySettings}
          initialSettings={smartInventorySettings}
        />
      </div>
    </MainLayout>
  );
}
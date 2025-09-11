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
import { sampleIngredients, sampleRecipes } from "@/lib/types/inventory";
import { inventoryService } from "@/lib/services/inventory";
import { useState, useEffect } from "react";

export default function InventoryManagement() {
  const [inventoryStatus, setInventoryStatus] = useState(inventoryService.getInventoryStatus());
  const [reorderSuggestions, setReorderSuggestions] = useState(inventoryService.getReorderSuggestions());
  const [ingredients, setIngredients] = useState(sampleIngredients);
  const [recipes, setRecipes] = useState(sampleRecipes);

  // State for add ingredient dialog
  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    category: "coffee",
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
    console.log("Add ingredient clicked", newIngredient);
    
    if (!newIngredient.name.trim() || 
        newIngredient.currentStock === "" || 
        newIngredient.minStock === "" || 
        newIngredient.maxStock === "" || 
        newIngredient.costPerUnit === "") {
      console.log("Validation failed", {
        name: newIngredient.name.trim(),
        currentStock: newIngredient.currentStock,
        minStock: newIngredient.minStock,
        maxStock: newIngredient.maxStock,
        costPerUnit: newIngredient.costPerUnit
      });
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
      id: `ingredient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newIngredient.name.trim(),
      unit: newIngredient.unit,
      currentStock: currentStock,
      minStock: minStock,
      maxStock: maxStock,
      costPerUnit: costPerUnit,
      supplier: newIngredient.supplier.trim(),
      shelfLife: 30, // Default shelf life
      category: newIngredient.category.toLowerCase() as "dairy" | "coffee" | "sweetener" | "pastry" | "other",
      lastRestocked: new Date(),
      isActive: newIngredient.status === "active"
    };
    
    // Add the ingredient to the state
    setIngredients(prev => [...prev, ingredient]);
    console.log("Ingredient added successfully", ingredient);
    
    // Reset form and close dialog
    setNewIngredient({
      name: "",
      category: "coffee",
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

  const resetAddIngredientForm = () => {
    setNewIngredient({
      name: "",
      category: "coffee",
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
              Track inventory and manage automatic reordering
            </p>
          </div>
          <div className="flex items-center space-x-2">
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
                            <SelectItem value="coffee">Coffee</SelectItem>
                            <SelectItem value="dairy">Dairy</SelectItem>
                            <SelectItem value="sweetener">Sweetener</SelectItem>
                            <SelectItem value="pastry">Pastry</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                    onClick={() => {
                      console.log("Button clicked!");
                      handleAddIngredient();
                    }}
                    disabled={(() => {
                      const isDisabled = !newIngredient.name.trim() || 
                                       newIngredient.currentStock === "" || 
                                       newIngredient.minStock === "" || 
                                       newIngredient.maxStock === "" || 
                                       newIngredient.costPerUnit === "";
                      console.log("Button disabled state:", isDisabled, "Form state:", newIngredient);
                      return isDisabled;
                    })()}
                  >
                    Add Ingredient
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStatus.totalIngredients}</div>
              <p className="text-xs text-muted-foreground">
                Active items tracked
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
              <CardTitle className="text-sm font-medium">Reorder Needed</CardTitle>
              <ShoppingCart className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{inventoryStatus.reorderNeeded}</div>
              <p className="text-xs text-muted-foreground">
                Auto-reorder suggestions
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
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              Track individual items and their current stock levels
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

        {/* Reorder Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-black" />
              <span>Reorder Suggestions</span>
            </CardTitle>
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

        {/* Recipe Management */}
        <Card>
          <CardHeader>
            <CardTitle>Product Recipes</CardTitle>
            <CardDescription>
              Define how much of each ingredient goes into each product
            </CardDescription>
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
      </div>
    </MainLayout>
  );
}
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
  RefreshCw,
  Search,
  Trash2
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Checkbox } from "@/app/components/ui/checkbox";
import { sampleIngredients, sampleRecipes, SmartInventorySettings, RecipeItem } from "@/lib/types/inventory";
import { inventoryService } from "@/lib/services/inventory";
import { SmartInventoryDialog } from "@/app/components/smart-inventory-dialog";
import { Switch } from "@/app/components/ui/switch";
import React, { useState, useEffect } from "react";

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
  
  // Sample products for recipe building
  const [products, setProducts] = useState([
    { id: '1', name: 'Espresso', category: 'Coffee', description: 'Classic espresso shot' },
    { id: '2', name: 'Cappuccino', category: 'Coffee', description: 'Espresso with steamed milk and foam' },
    { id: '3', name: 'Latte', category: 'Coffee', description: 'Espresso with lots of steamed milk' },
    { id: '4', name: 'Americano', category: 'Coffee', description: 'Espresso with hot water' },
    { id: '5', name: 'Mocha', category: 'Coffee', description: 'Espresso with chocolate and milk' },
    { id: '6', name: 'Macchiato', category: 'Coffee', description: 'Espresso with a dollop of foam' },
    { id: '7', name: 'Frappuccino', category: 'Cold Drinks', description: 'Blended coffee drink' },
    { id: '8', name: 'Cold Brew', category: 'Cold Drinks', description: 'Cold-steeped coffee' },
    { id: '9', name: 'Green Tea Latte', category: 'Tea', description: 'Matcha with steamed milk' },
    { id: '10', name: 'Chai Latte', category: 'Tea', description: 'Spiced tea with steamed milk' },
    { id: '11', name: 'Iced Coffee', category: 'Cold Drinks', description: 'Chilled coffee over ice' },
    { id: '12', name: 'Hot Chocolate', category: 'Beverages', description: 'Rich chocolate drink' },
    { id: '13', name: 'Smoothie Bowl', category: 'Food', description: 'Blended fruit bowl with toppings' }
  ]);

  // Tab state
  const [activeTab, setActiveTab] = useState("inventory");

  // Configuration modals state
  const [reorderConfigOpen, setReorderConfigOpen] = useState(false);
  const [recipeEditorOpen, setRecipeEditorOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [manageRecipesOpen, setManageRecipesOpen] = useState(false);
  const [recipeEditorSource, setRecipeEditorSource] = useState<'upload' | 'manage' | null>(null);
  
  // File processing state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [extractedRecipes, setExtractedRecipes] = useState<any[]>([]);
  const [processingMessage, setProcessingMessage] = useState('');
  const [showRecipeReview, setShowRecipeReview] = useState(false);
  const [userChoice, setUserChoice] = useState<'photos' | 'spreadsheet' | 'nothing' | 'unsure' | null>(null);
  
  // Enhanced recipe builder state
  const [recipeBuilderStep, setRecipeBuilderStep] = useState<'select-product' | 'add-ingredients' | 'review'>('select-product');
  const [selectedProductForRecipe, setSelectedProductForRecipe] = useState<any>(null);
  const [newProductForRecipe, setNewProductForRecipe] = useState({ name: '', category: '', description: '' });
  const [recipeIngredients, setRecipeIngredients] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [savedProductName, setSavedProductName] = useState('');
  const [manageRecipesSearchQuery, setManageRecipesSearchQuery] = useState('');
  

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

  // File processing functions
  const processFile = async (file: File) => {
    setUploadedFile(file);
    setProcessingStatus('processing');
    setProcessingMessage('Processing your file...');
    
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let extractedText = '';
      
      // Route to appropriate processor
      if (fileExtension && ['jpg', 'jpeg', 'png', 'pdf'].includes(fileExtension)) {
        extractedText = await processImageFile(file);
      } else if (fileExtension && ['xlsx', 'xls'].includes(fileExtension)) {
        extractedText = await processExcelFile(file);
      } else if (fileExtension === 'csv') {
        extractedText = await processCSVFile(file);
      } else {
        extractedText = await processTextFile(file);
      }
      
      // Parse recipes from extracted text
      const recipes = await parseRecipesFromText(extractedText);
      
      if (recipes.length > 0) {
        setExtractedRecipes(recipes);
        setProcessingStatus('success');
        setProcessingMessage(`Successfully extracted ${recipes.length} recipes!`);
        setShowRecipeReview(true);
      } else {
        setProcessingStatus('error');
        setProcessingMessage('No recipes found in the file. Please try a different file or use manual entry.');
      }
    } catch (error) {
      setProcessingStatus('error');
      setProcessingMessage('Error processing file. Please try again or use manual entry.');
      console.error('File processing error:', error);
    }
  };

  // Simulate OCR processing for images
  const processImageFile = async (file: File): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
    
    // Return realistic OCR output for demo
    return `
      ESPRESSO RECIPE
      Product: Espresso
      Ingredients:
      - Coffee Beans: 18g (required)
      - Water: 30ml (required)
      
      CAPPUCCINO RECIPE
      Product: Cappuccino
      Ingredients:
      - Coffee Beans: 18g (required)
      - Milk: 120ml (required)
      - Sugar: 5g (optional)
      
      LATTE RECIPE
      Product: Latte
      Ingredients:
      - Coffee Beans: 18g (required)
      - Milk: 200ml (required)
      - Vanilla Syrup: 10ml (optional)
    `;
  };

  // Process Excel files
  const processExcelFile = async (file: File): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return realistic Excel content for demo
    return `
      Product,Ingredient,Quantity,Unit,Required
      Espresso,Coffee Beans,18,g,Yes
      Espresso,Water,30,ml,Yes
      Cappuccino,Coffee Beans,18,g,Yes
      Cappuccino,Milk,120,ml,Yes
      Cappuccino,Sugar,5,g,No
      Latte,Coffee Beans,18,g,Yes
      Latte,Milk,200,ml,Yes
      Latte,Vanilla Syrup,10,ml,No
    `;
  };

  // Process CSV files
  const processCSVFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => reject(new Error('Failed to read CSV file'));
      reader.readAsText(file);
    });
  };

  // Process text files
  const processTextFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  };

  // AI-powered recipe parsing
  const parseRecipesFromText = async (text: string): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate AI processing
    
    const recipes: any[] = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    let currentProduct = '';
    let productId = 1;
    
    for (const line of lines) {
      // Detect product names
      if (line.includes('RECIPE') || line.includes('Product:')) {
        const productMatch = line.match(/(?:Product:\s*)?(\w+)/i);
        if (productMatch) {
          currentProduct = productMatch[1];
          productId++;
        }
      }
      
      // Detect ingredients
      if (line.includes(':') && (line.includes('g') || line.includes('ml') || line.includes('kg'))) {
        const ingredientMatch = line.match(/-?\s*([^:]+):\s*(\d+(?:\.\d+)?)\s*(g|ml|kg|L)\s*(?:\((\w+)\))?/i);
        if (ingredientMatch && currentProduct) {
          const [, ingredientName, quantity, unit, required] = ingredientMatch;
          recipes.push({
            productId: productId.toString(),
            productName: currentProduct,
            ingredientName: ingredientName.trim(),
            quantity: parseFloat(quantity),
            unit: unit,
            required: required ? required.toLowerCase() === 'required' : true,
            id: `${productId}-${ingredientName.trim()}-${Date.now()}`
          });
        }
      }
    }
    
    return recipes;
  };

  // Handle recipe review and confirmation
  const handleConfirmRecipes = () => {
    // Add extracted recipes to the existing recipes
    setRecipes(prevRecipes => [...prevRecipes, ...extractedRecipes]);
    setShowRecipeReview(false);
    setBulkImportOpen(false);
    setProcessingStatus('idle');
    setExtractedRecipes([]);
    setUploadedFile(null);
  };

  const handleEditRecipe = (recipeId: string, field: string, value: any) => {
    setExtractedRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId ? { ...recipe, [field]: value } : recipe
      )
    );
  };

  const handleRemoveRecipe = (recipeId: string) => {
    setExtractedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  // Enhanced recipe builder functions
  const handleStartRecipeBuilder = () => {
    setRecipeBuilderStep('select-product');
    setSelectedProductForRecipe(null);
    setNewProductForRecipe({ name: '', category: '', description: '' });
    setRecipeIngredients([]);
    setShowAddProduct(false);
  };


  const handleSelectExistingProduct = (product: any) => {
    setSelectedProductForRecipe(product);
    setRecipeBuilderStep('add-ingredients');
    setRecipeIngredients([]);
    // Close upload dialog and open recipe builder
    setBulkImportOpen(false);
    setRecipeEditorOpen(true);
  };

  const handleCreateNewProduct = () => {
    setShowAddProduct(true);
  };

  const handleSaveNewProduct = () => {
    if (!newProductForRecipe.name.trim()) return;
    
    const newProduct = {
      id: (products.length + 1).toString(),
      ...newProductForRecipe
    };
    
    setProducts(prev => [...prev, newProduct]);
    setSelectedProductForRecipe(newProduct);
    setShowAddProduct(false);
    setRecipeBuilderStep('add-ingredients');
    setNewProductForRecipe({ name: '', category: '', description: '' });
  };

  const handleAddIngredientToRecipe = () => {
    setRecipeIngredients(prev => [...prev, {
      id: `temp-${Date.now()}`,
      ingredientName: '',
      quantity: 0,
      unit: 'g',
      required: true
    }]);
  };

  const handleUpdateRecipeIngredient = (ingredientId: string, field: string, value: any) => {
    setRecipeIngredients(prev => 
      prev.map(ingredient => 
        ingredient.id === ingredientId ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleRemoveRecipeIngredient = (ingredientId: string) => {
    setRecipeIngredients(prev => prev.filter(ingredient => ingredient.id !== ingredientId));
  };

  const handleSaveRecipe = () => {
    if (!selectedProductForRecipe || recipeIngredients.length === 0) return;
    
    const newRecipes = recipeIngredients.map(ingredient => ({
      id: `${selectedProductForRecipe.id}-${ingredient.ingredientName}-${Date.now()}`,
      productId: selectedProductForRecipe.id,
      ingredientId: `ingredient-${ingredient.ingredientName.toLowerCase().replace(/\s+/g, '-')}`,
      ingredientName: ingredient.ingredientName,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      isOptional: !ingredient.required
    }));
    
    setRecipes(prev => [...prev, ...newRecipes]);
    setSavedProductName(selectedProductForRecipe.name);
    setShowSaveConfirmation(true);
  };

  const handleBackToProductSelection = () => {
    setRecipeBuilderStep('select-product');
    setSelectedProductForRecipe(null);
    setRecipeIngredients([]);
    
    // If we came from manage recipes, go back to manage recipes
    if (recipeEditorSource === 'manage') {
      setRecipeEditorOpen(false);
      setManageRecipesOpen(true);
    }
  };

  const handleCreateAnotherRecipe = () => {
    setShowSaveConfirmation(false);
    setRecipeBuilderStep('select-product');
    setSelectedProductForRecipe(null);
    setRecipeIngredients([]);
    setProductSearchQuery('');
    setSavedProductName('');
  };

  const handleFinishRecipeBuilding = () => {
    setShowSaveConfirmation(false);
    setRecipeEditorOpen(false);
    setRecipeBuilderStep('select-product');
    setSelectedProductForRecipe(null);
    setRecipeIngredients([]);
    setProductSearchQuery('');
    setSavedProductName('');
    // Reset upload dialog state to show 4-card selection
    setUserChoice(null);
    setProcessingStatus('idle');
    setExtractedRecipes([]);
    setUploadedFile(null);
    setShowRecipeReview(false);
    setRecipeEditorSource(null);
  };

  // Filter products based on search query - optimized for instant response
  const filteredProducts = React.useMemo(() => {
    if (!productSearchQuery.trim()) return products;
    
    const query = productSearchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [products, productSearchQuery]);

  // Filter products for manage recipes popup
  const filteredManageProducts = React.useMemo(() => {
    if (!manageRecipesSearchQuery.trim()) return products;
    
    const query = manageRecipesSearchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [products, manageRecipesSearchQuery]);

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
                      onClick={() => setManageRecipesOpen(true)}
                      className="flex items-center gap-2"
                  >
                      <Settings className="w-4 h-4" />
                      Manage Recipes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                      className="flex items-center gap-2"
                      onClick={() => setBulkImportOpen(true)}
                  >
                      <Package className="w-4 h-4" />
                      Upload Recipes
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
                          <SelectItem value="6">Macchiato</SelectItem>
                          <SelectItem value="7">Frappuccino</SelectItem>
                          <SelectItem value="8">Cold Brew</SelectItem>
                          <SelectItem value="9">Green Tea Latte</SelectItem>
                          <SelectItem value="10">Chai Latte</SelectItem>
                          <SelectItem value="11">Iced Coffee</SelectItem>
                          <SelectItem value="12">Hot Chocolate</SelectItem>
                          <SelectItem value="13">Smoothie Bowl</SelectItem>
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

        {/* Enhanced Recipe Builder Modal */}
        <Dialog open={recipeEditorOpen} onOpenChange={(open) => {
          setRecipeEditorOpen(open);
          if (!open) {
            setRecipeBuilderStep('select-product');
            setSelectedProductForRecipe(null);
            setRecipeIngredients([]);
            setShowAddProduct(false);
            setProductSearchQuery('');
            setShowSaveConfirmation(false);
            setSavedProductName('');
            // Reset user choice so bulk import shows main selection
            setUserChoice(null);
            // Reset recipe editor source
            setRecipeEditorSource(null);
          }
        }}>
          <DialogContent 
            className="max-w-4xl max-h-[90vh] overflow-y-auto no-blur-dialog"
          >
            <DialogHeader>
              <DialogTitle>Build Your Recipe</DialogTitle>
              <DialogDescription>
                {recipeBuilderStep === 'select-product' && "Choose a product to create a recipe for, or add a new product"}
                {recipeBuilderStep === 'add-ingredients' && `Add ingredients for ${selectedProductForRecipe?.name}`}
                {recipeBuilderStep === 'review' && "Review your recipe before saving"}
              </DialogDescription>
            </DialogHeader>
            
            <div 
              className="space-y-6 py-4"
              style={{
                transform: 'none',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                willChange: 'auto'
              }}
            >
              {/* Step 1: Product Selection */}
              {recipeBuilderStep === 'select-product' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-medium mb-2">
                        What product are you creating a recipe for?
                        </h3>
                        <p className="text-sm text-muted-foreground">
                        Choose from existing products or add a new one
                        </p>
                      </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (recipeEditorSource === 'manage') {
                          setRecipeEditorOpen(false);
                          setManageRecipesOpen(true);
                        } else if (recipeEditorSource === 'upload') {
                          // If coming from upload, go back to the upload dialog
                          setRecipeEditorOpen(false);
                          setBulkImportOpen(true);
                        } else {
                          // Default behavior - close the dialog
                          setRecipeEditorOpen(false);
                        }
                      }}
                      className="ml-4"
                    >
                      ← Back
                    </Button>
                    </div>
                  
                  {/* Existing Products */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Existing Products</h4>
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search products..."
                          value={productSearchQuery}
                          onChange={(e) => setProductSearchQuery(e.target.value)}
                          className="w-48 text-sm transition-all duration-150"
                        />
                        {productSearchQuery && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setProductSearchQuery('')}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="min-h-[240px] max-h-60 overflow-y-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-200">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <div
                              key={product.id}
                              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={() => handleSelectExistingProduct(product)}
                            >
                              <div className="flex items-center justify-between">
                      <div>
                                  <h5 className="font-medium">{product.name}</h5>
                                  <p className="text-sm text-muted-foreground">{product.category}</p>
                                  <p className="text-xs text-muted-foreground">{product.description}</p>
                                </div>
                                <Button size="sm" variant="outline">
                                  Select
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center min-h-[200px]">
                            <Search className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                              {productSearchQuery ? `No products found for "${productSearchQuery}"` : "No products available"}
                            </p>
                            {productSearchQuery && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setProductSearchQuery('')}
                              >
                                Clear search
                              </Button>
                            )}
                      </div>
                        )}
                    </div>
                    </div>
                  </div>
                  
                  {/* Add New Product */}
                  <div className="border-t pt-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Don't see your product? Add a new one
                      </p>
                      <Button onClick={handleCreateNewProduct}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                      </Button>
                    </div>
                  </div>
            </div>
              )}

              {/* Step 2: Add Ingredients */}
              {recipeBuilderStep === 'add-ingredients' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Add Ingredients for {selectedProductForRecipe?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                        What ingredients go into this product?
                        </p>
                      </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBackToProductSelection}
                    >
                      ← Back
                    </Button>
                    </div>
                  
                  {/* Ingredients List */}
                  <div className="space-y-3">
                    {recipeIngredients.map((ingredient) => (
                      <div key={ingredient.id} className="p-4 border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          <div>
                            <Label className="text-xs">Ingredient</Label>
                            <Input
                              value={ingredient.ingredientName}
                              onChange={(e) => handleUpdateRecipeIngredient(ingredient.id, 'ingredientName', e.target.value)}
                              placeholder="e.g., Coffee Beans"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Quantity</Label>
                            <Input
                              type="number"
                              value={ingredient.quantity}
                              onChange={(e) => handleUpdateRecipeIngredient(ingredient.id, 'quantity', parseFloat(e.target.value) || 0)}
                              placeholder="18"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Unit</Label>
                            <Select
                              value={ingredient.unit}
                              onValueChange={(value) => handleUpdateRecipeIngredient(ingredient.id, 'unit', value)}
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="g">g</SelectItem>
                                <SelectItem value="kg">kg</SelectItem>
                                <SelectItem value="ml">ml</SelectItem>
                                <SelectItem value="L">L</SelectItem>
                                <SelectItem value="oz">oz</SelectItem>
                                <SelectItem value="lb">lb</SelectItem>
                                <SelectItem value="tsp">tsp</SelectItem>
                                <SelectItem value="tbsp">tbsp</SelectItem>
                                <SelectItem value="cup">cup</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Required</Label>
                            <div className="flex items-center space-x-2 mt-2">
                              <Checkbox
                                checked={ingredient.required}
                                onCheckedChange={(checked) => handleUpdateRecipeIngredient(ingredient.id, 'required', checked)}
                              />
                              <span className="text-sm">Required</span>
                            </div>
                          </div>
                          <div className="flex items-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveRecipeIngredient(ingredient.id)}
                              className="w-full"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Ingredient Button */}
                  <Button
                    variant="outline"
                    onClick={handleAddIngredientToRecipe}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Ingredient
                  </Button>
                  
                  {/* Save Recipe Button */}
                  {recipeIngredients.length > 0 && (
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={handleBackToProductSelection}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveRecipe}>
                        Save Recipe
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Save Confirmation Dialog */}
        <Dialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Recipe Saved Successfully!
              </DialogTitle>
              <DialogDescription>
                Your recipe for <strong>{savedProductName}</strong> has been saved and added to your inventory system.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                You can now track this product's ingredient usage and get low stock alerts when ingredients run out.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 pt-4">
              <Button 
                onClick={handleCreateAnotherRecipe}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Another Recipe
              </Button>
              <Button 
                variant="outline" 
                onClick={handleFinishRecipeBuilding}
                className="w-full"
              >
                Finish
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add New Product Modal */}
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product for your recipe
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={newProductForRecipe.name}
                  onChange={(e) => setNewProductForRecipe(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Vanilla Latte"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select
                  value={newProductForRecipe.category}
                  onValueChange={(value) => setNewProductForRecipe(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Coffee">Coffee</SelectItem>
                    <SelectItem value="Tea">Tea</SelectItem>
                    <SelectItem value="Cold Drinks">Cold Drinks</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-description">Description (Optional)</Label>
                <Input
                  id="product-description"
                  value={newProductForRecipe.description}
                  onChange={(e) => setNewProductForRecipe(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the product"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddProduct(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveNewProduct}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Smart Upload Dialog */}
        <Dialog open={bulkImportOpen} onOpenChange={(open) => {
          setBulkImportOpen(open);
          if (!open) {
            setUserChoice(null);
            setProcessingStatus('idle');
            setExtractedRecipes([]);
            setUploadedFile(null);
          } else {
            // Reset to main selection when opening - ensure all state is clean
            setUserChoice(null);
            setProcessingStatus('idle');
            setExtractedRecipes([]);
            setUploadedFile(null);
            setShowRecipeReview(false);
            setRecipeEditorSource(null);
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Get Your Recipes Into The System</DialogTitle>
              <DialogDescription>
                Let's get your inventory tracking up and running! What do you currently have for your recipes?
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {!userChoice ? (
                /* User Choice Selection */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                    onClick={() => setUserChoice('photos')}
                  >
                    <Package className="w-8 h-8" />
                    <span className="font-medium">I have photos</span>
                    <span className="text-xs text-muted-foreground">Handwritten notes or documents</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                    onClick={() => setUserChoice('spreadsheet')}
                  >
                    <Settings className="w-8 h-8" />
                    <span className="font-medium">I have a spreadsheet</span>
                    <span className="text-xs text-muted-foreground">Excel, CSV, or similar files</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                    onClick={() => setUserChoice('nothing')}
                  >
                    <Plus className="w-8 h-8" />
                    <span className="font-medium">I have nothing written</span>
                    <span className="text-xs text-muted-foreground">Let's build recipes together</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
                    onClick={() => setUserChoice('unsure')}
                  >
                    <AlertCircle className="w-8 h-8" />
                    <span className="font-medium">I'm not sure</span>
                    <span className="text-xs text-muted-foreground">Show me examples</span>
                  </Button>
                </div>
              ) : userChoice === 'nothing' ? (
                /* Nothing Written Step */
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Let's build your recipes together</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll help you add your most popular items first, then you can add more over time.
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => {
                      setBulkImportOpen(false);
                      setRecipeEditorSource('upload');
                      handleStartRecipeBuilder();
                      setRecipeEditorOpen(true);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Start Building Recipes
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setUserChoice(null)}
                    className="mt-4"
                  >
                    ← Back
                  </Button>
                </div>
              ) : (
                /* Specific Upload Interface Based on Choice */
                <div className="space-y-4">
                  {/* Back Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUserChoice(null)}
                    className="mb-4"
                  >
                    ← Back to options
                  </Button>

                  {/* Photos Option */}
                  {userChoice === 'photos' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Upload Photos of Your Recipes</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Take photos of handwritten notes or documents with your recipes
                        </p>
                      </div>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h4 className="text-lg font-medium mb-2">Drop your photos here</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Or click to browse your computer
                        </p>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          multiple
                          className="max-w-xs mx-auto"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {
                              processFile(files[0]); // Process first file for now
                            }
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          We'll use AI to read the text and extract your recipes
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Spreadsheet Option */}
                  {userChoice === 'spreadsheet' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Upload Your Spreadsheet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your Excel file, CSV, or any spreadsheet with your recipes
                        </p>
                      </div>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h4 className="text-lg font-medium mb-2">Drop your file here</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Or click to browse your computer
                        </p>
                        <Input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          className="max-w-xs mx-auto"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              processFile(file);
                            }
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          We'll automatically detect and extract your recipe data
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Nothing Written Option */}
                  {userChoice === 'nothing' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Let's Build Your Recipes Together</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          No problem! We'll guide you through adding your ingredients and recipes step by step
                        </p>
                      </div>
                      <div className="p-6 bg-blue-50 rounded-lg text-center">
                        <h4 className="font-medium text-blue-900 mb-2">Ready to get started?</h4>
                        <p className="text-sm text-blue-800 mb-4">
                          We'll help you add your most popular items first, then you can add more over time.
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() => {
                              setBulkImportOpen(false);
                              setRecipeEditorSource('upload');
                              handleStartRecipeBuilder();
                              setRecipeEditorOpen(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Start Building Recipes
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Unsure Option */}
                  {userChoice === 'unsure' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">What Do You Currently Have?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Here are some examples of what we can work with:
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">📸 Photos</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Handwritten recipe cards, notes, or any documents
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUserChoice('photos')}
                          >
                            Try Photos
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">📊 Spreadsheets</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Excel files, CSV files, or any organized data
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUserChoice('spreadsheet')}
                          >
                            Try Spreadsheet
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">✍️ Nothing Written</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            We'll help you build recipes from scratch
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUserChoice('nothing')}
                          >
                            Start Fresh
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">❓ Still Not Sure?</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Contact support or try the manual entry
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setBulkImportOpen(false);
                              setRecipeEditorOpen(true);
                            }}
                          >
                            Manual Entry
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Processing Status */}
                  {processingStatus !== 'idle' && (
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        {processingStatus === 'processing' && (
                          <>
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-muted-foreground">{processingMessage}</span>
                          </>
                        )}
                        {processingStatus === 'success' && (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-700">{processingMessage}</span>
                          </>
                        )}
                        {processingStatus === 'error' && (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-700">{processingMessage}</span>
                          </>
                        )}
                      </div>
                      {uploadedFile && (
                        <div className="text-xs text-muted-foreground">
                          Processing: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Recipe Review Dialog */}
        <Dialog open={showRecipeReview} onOpenChange={setShowRecipeReview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Extracted Recipes</DialogTitle>
              <DialogDescription>
                Please review the recipes we found in your file. You can edit or remove any items before confirming.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {extractedRecipes.map((recipe) => (
                <div key={recipe.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{recipe.productName} Recipe</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveRecipe(recipe.id)}
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <Label className="text-xs">Ingredient Name</Label>
                      <Input
                        value={recipe.ingredientName}
                        onChange={(e) => handleEditRecipe(recipe.id, 'ingredientName', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input
                        type="number"
                        value={recipe.quantity}
                        onChange={(e) => handleEditRecipe(recipe.id, 'quantity', parseFloat(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Unit</Label>
                      <Select
                        value={recipe.unit}
                        onValueChange={(value) => handleEditRecipe(recipe.id, 'unit', value)}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="oz">oz</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Required</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          checked={recipe.required}
                          onCheckedChange={(checked) => handleEditRecipe(recipe.id, 'required', checked)}
                        />
                        <span className="text-sm">Required ingredient</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRecipeReview(false);
                  setProcessingStatus('idle');
                  setExtractedRecipes([]);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmRecipes}>
                Confirm {extractedRecipes.length} Recipes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Recipes Dialog */}
        <Dialog open={manageRecipesOpen} onOpenChange={(open) => {
          setManageRecipesOpen(open);
          if (!open) {
            setManageRecipesSearchQuery('');
          }
        }}>
          <DialogContent className="max-w-4xl h-[500px] flex flex-col">
            <DialogHeader>
              <DialogTitle>Manage Recipes</DialogTitle>
              <DialogDescription>
                View, edit, and manage your existing recipes
              </DialogDescription>
            </DialogHeader>
            
            {/* Search Bar */}
            <div className="flex items-center space-x-2 py-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={manageRecipesSearchQuery}
                onChange={(e) => setManageRecipesSearchQuery(e.target.value)}
                className="flex-1"
              />
              {manageRecipesSearchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setManageRecipesSearchQuery('')}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="grid gap-4 md:grid-cols-2">
                {/* All Products List */}
                {filteredManageProducts.map((product) => {
                  const productRecipes = recipes.filter(r => r.productId === product.id);
                  const hasRecipes = productRecipes.length > 0;
                  
                  return (
                    <Card key={product.id} className="p-4">
                      <div className="flex flex-col space-y-3">
                        <div>
                          <h4 className="font-medium text-lg">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {hasRecipes 
                              ? `${productRecipes.length} ingredient${productRecipes.length !== 1 ? 's' : ''}`
                              : 'No recipe created yet'
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProductForRecipe(product);
                              setRecipeIngredients(productRecipes);
                              setRecipeBuilderStep('add-ingredients');
                              setRecipeEditorSource('manage');
                              setManageRecipesOpen(false);
                              setRecipeEditorOpen(true);
                            }}
                            className="flex-1"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            {hasRecipes ? 'Edit' : 'Create'}
                          </Button>
                          {hasRecipes && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Remove all recipes for this product
                                const updatedRecipes = recipes.filter(r => r.productId !== product.id);
                                setRecipes(updatedRecipes);
                              }}
                              className="text-destructive hover:text-destructive flex-1"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setManageRecipesOpen(false)}>
                Close
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
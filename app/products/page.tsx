"use client"

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { 
  Search, 
  Plus, 
  Clock,
  AlertCircle,
  Package,
  Settings,
  Zap,
  TrendingUp,
  X,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { inventoryService } from "@/lib/services/inventory";
import { PeakHour, DayPeakHours, PeakHourSettings, DAYS_OF_WEEK } from "@/lib/types/peak-hours";
import { sampleIngredients, sampleRecipes } from "@/lib/types/inventory";
import { ProductPeakHoursDialog } from "@/app/components/product-peak-hours-dialog";
import { GlobalSmartPricingDialog } from "@/app/components/global-smart-pricing-dialog";
import { ProductIngredientsDialog } from "@/app/components/product-ingredients-dialog";

export default function Products() {
  // State for peak hour settings - now using the new structure
  const [peakHourSettings, setPeakHourSettings] = React.useState<{[key: string]: PeakHourSettings}>({
    // Sample data for demonstration
    "1": {
      days: DAYS_OF_WEEK.map((day, index) => ({
        day,
        enabled: index < 5, // Monday-Friday enabled
        peakHours: index < 5 ? [
          {
            id: `morning-${day.toLowerCase()}`,
            startTime: "07:00",
            endTime: "09:00",
            multiplier: 1.15,
            label: "Morning Rush"
          },
          {
            id: `lunch-${day.toLowerCase()}`,
            startTime: "12:00",
            endTime: "14:00",
            multiplier: 1.20,
            label: "Lunch Rush"
          }
        ] : [],
        minPrice: index < 5 ? (index === 0 ? 1.50 : 1.25) : undefined, // Monday higher min, others lower
        maxPrice: index < 5 ? (index === 4 ? 5.00 : 4.50) : undefined // Friday higher max, others lower
      })),
      globalMultiplier: 1.15
    }
  });

  // State for search
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // State for category filter
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  
  
  // State for add product dialog
  const [isAddProductOpen, setIsAddProductOpen] = React.useState(false);
  const [addProductRecipe, setAddProductRecipe] = React.useState<any[]>([]);
  
  // State for peak hours dialog
  const [peakHoursDialogOpen, setPeakHoursDialogOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  
  // State for ingredients dialog
  const [ingredientsDialogOpen, setIngredientsDialogOpen] = React.useState(false);
  const [selectedProductForIngredients, setSelectedProductForIngredients] = React.useState<string | null>(null);
  
  
  // State for global smart pricing
  const [globalSmartPricingDialogOpen, setGlobalSmartPricingDialogOpen] = React.useState(false);
  const [globalSmartPricingSettings, setGlobalSmartPricingSettings] = React.useState({
    enabled: false,
    globalPeakHours: {
      days: DAYS_OF_WEEK.map(day => ({
        day,
        enabled: false,
        peakHours: []
      })),
      globalMultiplier: 1.15
    },
    priceParameters: {
      minPricePercentage: 50,
      maxPricePercentage: 150,
      defaultMultiplier: 1.15,
      pricingStrategy: 'multiplier' as const
    }
  });


  const [newProduct, setNewProduct] = React.useState({
    name: "",
    basePrice: ""
  });


  // Products data - now stateful so we can add new products
  const [products, setProducts] = React.useState([
    {
      id: 1,
      name: "Espresso",
      category: "Hot Drinks",
      currentPrice: 3.50,
      basePrice: 3.25,
      peakPrice: 3.75,
      wastePrevention: 5, // System calculated
      inventory: 45,
      status: "active",
      lastUpdated: "2 min ago"
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "Hot Drinks",
      currentPrice: 4.25,
      basePrice: 4.50,
      peakPrice: 4.75,
      wastePrevention: 15,
      inventory: 12,
      status: "low",
      lastUpdated: "15 min ago"
    },
    {
      id: 3,
      name: "Latte",
      category: "Hot Drinks",
      currentPrice: 4.75,
      basePrice: 4.75,
      peakPrice: 5.25,
      wastePrevention: 0,
      inventory: 28,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 4,
      name: "Croissant",
      category: "Pastries",
      currentPrice: 2.50,
      basePrice: 2.95,
      peakPrice: 3.25,
      wastePrevention: 25,
      inventory: 8,
      status: "low",
      lastUpdated: "30 min ago"
    },
    {
      id: 5,
      name: "Muffin",
      category: "Pastries",
      currentPrice: 3.25,
      basePrice: 3.25,
      peakPrice: 3.50,
      wastePrevention: 0,
      inventory: 15,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      id: 6,
      name: "Americano",
      category: "Hot Drinks",
      currentPrice: 3.25,
      basePrice: 3.00,
      peakPrice: 3.50,
      wastePrevention: 0,
      inventory: 32,
      status: "active",
      lastUpdated: "45 min ago"
    },
    {
      id: 7,
      name: "Blueberry Muffin",
      category: "Pastries",
      currentPrice: 3.75,
      basePrice: 3.50,
      peakPrice: 4.00,
      wastePrevention: 0,
      inventory: 18,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 8,
      name: "Chocolate Croissant",
      category: "Pastries",
      currentPrice: 4.25,
      basePrice: 4.00,
      peakPrice: 4.50,
      wastePrevention: 0,
      inventory: 12,
      status: "active",
      lastUpdated: "30 min ago"
    },
    {
      id: 9,
      name: "Cold Brew",
      category: "Cold Drinks",
      currentPrice: 4.50,
      basePrice: 4.25,
      peakPrice: 4.75,
      wastePrevention: 0,
      inventory: 25,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      id: 10,
      name: "Danish Pastry",
      category: "Pastries",
      currentPrice: 3.95,
      basePrice: 3.75,
      peakPrice: 4.25,
      wastePrevention: 0,
      inventory: 8,
      status: "low",
      lastUpdated: "1 hour ago"
    },
    {
      id: 11,
      name: "Espresso Macchiato",
      category: "Hot Drinks",
      currentPrice: 4.00,
      basePrice: 3.75,
      peakPrice: 4.25,
      wastePrevention: 0,
      inventory: 20,
      status: "active",
      lastUpdated: "45 min ago"
    },
    {
      id: 12,
      name: "French Toast",
      category: "Breakfast",
      currentPrice: 8.95,
      basePrice: 8.50,
      peakPrice: 9.50,
      wastePrevention: 0,
      inventory: 5,
      status: "low",
      lastUpdated: "3 hours ago"
    },
    {
      id: 13,
      name: "Green Tea",
      category: "Tea/Matcha",
      currentPrice: 2.75,
      basePrice: 2.50,
      peakPrice: 3.00,
      wastePrevention: 0,
      inventory: 30,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 14,
      name: "Hot Chocolate",
      category: "Cold Drinks",
      currentPrice: 3.50,
      basePrice: 3.25,
      peakPrice: 3.75,
      wastePrevention: 0,
      inventory: 22,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      id: 15,
      name: "Iced Coffee",
      category: "Cold Drinks",
      currentPrice: 3.75,
      basePrice: 3.50,
      peakPrice: 4.00,
      wastePrevention: 0,
      inventory: 28,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 16,
      name: "Jasmine Tea",
      category: "Tea/Matcha",
      currentPrice: 2.95,
      basePrice: 2.75,
      peakPrice: 3.25,
      wastePrevention: 0,
      inventory: 15,
      status: "active",
      lastUpdated: "45 min ago"
    },
    {
      id: 17,
      name: "Key Lime Pie",
      category: "Dessert",
      currentPrice: 5.50,
      basePrice: 5.25,
      peakPrice: 5.95,
      wastePrevention: 0,
      inventory: 6,
      status: "low",
      lastUpdated: "2 hours ago"
    },
    {
      id: 18,
      name: "Lemon Scone",
      category: "Pastries",
      currentPrice: 3.25,
      basePrice: 3.00,
      peakPrice: 3.50,
      wastePrevention: 0,
      inventory: 14,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 19,
      name: "Mocha",
      category: "Hot Drinks",
      currentPrice: 4.75,
      basePrice: 4.50,
      peakPrice: 5.00,
      wastePrevention: 0,
      inventory: 19,
      status: "active",
      lastUpdated: "30 min ago"
    },
    {
      id: 20,
      name: "Nitro Cold Brew",
      category: "Cold Drinks",
      currentPrice: 5.25,
      basePrice: 5.00,
      peakPrice: 5.50,
      wastePrevention: 0,
      inventory: 16,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 21,
      name: "Orange Juice",
      category: "Cold Drinks",
      currentPrice: 3.25,
      basePrice: 3.00,
      peakPrice: 3.50,
      wastePrevention: 0,
      inventory: 24,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      id: 22,
      name: "Pumpkin Spice Latte",
      category: "Hot Drinks",
      currentPrice: 5.50,
      basePrice: 5.25,
      peakPrice: 5.95,
      wastePrevention: 0,
      inventory: 12,
      status: "active",
      lastUpdated: "45 min ago"
    },
    {
      id: 23,
      name: "Quiche Lorraine",
      category: "Breakfast",
      currentPrice: 7.95,
      basePrice: 7.50,
      peakPrice: 8.50,
      wastePrevention: 0,
      inventory: 4,
      status: "low",
      lastUpdated: "3 hours ago"
    },
    {
      id: 24,
      name: "Raspberry Danish",
      category: "Pastries",
      currentPrice: 4.50,
      basePrice: 4.25,
      peakPrice: 4.75,
      wastePrevention: 0,
      inventory: 10,
      status: "active",
      lastUpdated: "1 hour ago"
    },
    {
      id: 25,
      name: "Smoothie Bowl",
      category: "Breakfast",
      currentPrice: 9.95,
      basePrice: 9.50,
      peakPrice: 10.50,
      wastePrevention: 0,
      inventory: 3,
      status: "low",
      lastUpdated: "4 hours ago"
    },
    {
      id: 26,
      name: "Tiramisu",
      category: "Dessert",
      currentPrice: 6.50,
      basePrice: 6.25,
      peakPrice: 6.95,
      wastePrevention: 0,
      inventory: 7,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      id: 27,
      name: "Green Tea Latte",
      category: "Tea/Matcha",
      currentPrice: 5.25,
      basePrice: 5.00,
      peakPrice: 5.50,
      wastePrevention: 8,
      inventory: 23,
      status: "active",
      lastUpdated: "5 min ago"
    },
    {
      id: 28,
      name: "Chai Latte",
      category: "Tea/Matcha",
      currentPrice: 4.95,
      basePrice: 4.75,
      peakPrice: 5.25,
      wastePrevention: 12,
      inventory: 18,
      status: "active",
      lastUpdated: "8 min ago"
    },
    {
      id: 29,
      name: "Frappuccino",
      category: "Cold Drinks",
      currentPrice: 5.75,
      basePrice: 5.50,
      peakPrice: 6.00,
      wastePrevention: 15,
      inventory: 14,
      status: "low",
      lastUpdated: "12 min ago"
    }
  ]);


  // Calculate waste prevention pricing for each product
  const getWastePreventionPricing = (productId: string) => {
    return inventoryService.getWastePreventionPricing(productId.toString());
  };

  // Filter products based on search query and category
  const filteredProducts = React.useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => {
        const name = product.name.toLowerCase();
        // Check if any word in the product name starts with the search query
        return name.split(' ').some(word => word.startsWith(query));
      });
    }
    
    // Sort results
    return filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        // Prioritize exact matches first
        if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
        if (!aName.startsWith(query) && bName.startsWith(query)) return 1;
      }
      
      // Then sort alphabetically
      return aName.localeCompare(bName);
    });
  }, [searchQuery, selectedCategory]);

  // Handle add product
  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.basePrice) {
      return; // Basic validation
    }
    
    const basePrice = parseFloat(newProduct.basePrice);
    
    const product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: newProduct.name.trim(),
      category: "Hot Drinks", // Default category
      currentPrice: basePrice, // Start with base price
      basePrice: basePrice,
      peakPrice: basePrice * 1.2, // Default 20% peak price increase
      wastePrevention: Math.floor(Math.random() * 20), // System calculated
      inventory: 0, // Default inventory
      status: "active",
      lastUpdated: "Just now"
    };
    
    // Add the product to the state
    setProducts(prev => [...prev, product]);
    
    // Save the recipe to sampleRecipes if ingredients were added
    if (addProductRecipe.length > 0 && addProductRecipe.every(ing => ing.ingredientId && ing.quantity)) {
      const recipeItems = addProductRecipe
        .filter(ing => ing.ingredientId && ing.quantity)
        .map(ing => ({
          ingredientId: ing.ingredientId,
          ingredientName: ing.ingredientName,
          quantity: parseFloat(ing.quantity),
          unit: ing.unit
        }));
      
      // In a real app, you would save this to your backend/database
      console.log('Recipe saved for product:', product.name, recipeItems);
    }
    
    // Reset form and close dialog
    setNewProduct({
      name: "",
      basePrice: ""
    });
    setAddProductRecipe([]); // Reset recipe ingredients
    setIsAddProductOpen(false);
  };

  const resetAddProductForm = () => {
    setNewProduct({
      name: "",
      basePrice: ""
    });
    setAddProductRecipe([]); // Reset recipe ingredients
  };


  // Handle peak hour settings update
  const updatePeakHourSettings = (productId: string, settings: Partial<PeakHourSettings>) => {
    setPeakHourSettings(prev => {
      const currentSettings = prev[productId];
      
      if (!currentSettings) {
        return {
          ...prev,
          [productId]: {
            days: DAYS_OF_WEEK.map(day => ({
              day,
              enabled: false,
              peakHours: []
            })),
            globalMultiplier: 1.15,
            ...settings
          }
        };
      }
      
      return {
        ...prev,
        [productId]: {
          ...currentSettings,
          ...settings
        }
      };
    });
  };

  // Helper function to get default peak hour settings for a product
  const getDefaultPeakHourSettings = (): PeakHourSettings => ({
    days: DAYS_OF_WEEK.map(day => ({
      day,
      enabled: false,
      peakHours: []
    })),
    globalMultiplier: 1.15
  });

  // Handle opening peak hours dialog
  const handleOpenPeakHoursDialog = (productId: string) => {
    setSelectedProductId(productId);
    setPeakHoursDialogOpen(true);
  };

  // Handle opening ingredients dialog
  const handleOpenIngredientsDialog = (productId: string) => {
    setSelectedProductForIngredients(productId);
    setIngredientsDialogOpen(true);
  };

  // Handle saving peak hours settings
  const handleSavePeakHoursSettings = (settings: PeakHourSettings) => {
    if (selectedProductId) {
      updatePeakHourSettings(selectedProductId, settings);
    }
    setPeakHoursDialogOpen(false);
    setSelectedProductId(null);
  };

  // Handle saving global smart pricing settings
  const handleSaveGlobalSmartPricingSettings = (settings: any) => {
    setGlobalSmartPricingSettings(settings);
    // Here you would typically save to your backend/state management
    console.log('Global smart pricing settings saved:', settings);
  };


  // Functions for managing recipe ingredients in add product popup
  const handleAddIngredientToProduct = () => {
    const newIngredient = {
      id: Date.now().toString(),
      ingredientId: '',
      ingredientName: '',
      quantity: '',
      unit: 'g'
    };
    setAddProductRecipe(prev => [...prev, newIngredient]);
  };

  const handleRemoveIngredientFromProduct = (ingredientId: string) => {
    setAddProductRecipe(prev => prev.filter(ingredient => ingredient.id !== ingredientId));
  };

  const handleUpdateIngredientInProduct = (ingredientId: string, field: string, value: string) => {
    setAddProductRecipe(prev => prev.map(ingredient => {
      if (ingredient.id === ingredientId) {
        if (field === 'ingredientId') {
          const selectedIngredient = sampleIngredients.find(ing => ing.id === value);
          return {
            ...ingredient,
            ingredientId: value,
            ingredientName: selectedIngredient?.name || '',
            unit: selectedIngredient?.unit || 'g'
          };
        }
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    }));
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-black";
      case "low": return "text-black";
      case "out": return "text-black";
      default: return "text-black";
    }
  };

  const isPeakHour = () => {
    const hour = new Date().getHours();
    return hour >= 7 && hour <= 9 || hour >= 12 && hour <= 14 || hour >= 17 && hour <= 19;
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Smart pricing and inventory management for your products
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Global Smart Pricing Toggle */}
            <div className="flex items-center gap-2">
              <Switch
                id="global-smart-pricing"
                checked={globalSmartPricingSettings.enabled}
                onCheckedChange={(checked) => 
                  setGlobalSmartPricingSettings(prev => ({ ...prev, enabled: checked }))
                }
              />
              <Label htmlFor="global-smart-pricing" className="text-sm font-medium">
                Global Smart Pricing
              </Label>
            </div>
            
            {/* Global Smart Pricing Settings Button */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setGlobalSmartPricingDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Configure
            </Button>

            
            
            {/* Add Product Button */}
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new product with basic pricing information.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name *</Label>
                      <Input
                        id="product-name"
                        placeholder="e.g., Vanilla Latte"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-black">Pricing</h4>
                    <div className="space-y-2">
                      <Label htmlFor="base-price">Base Price ($) *</Label>
                      <Input
                        id="base-price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="4.25"
                        value={newProduct.basePrice}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, basePrice: e.target.value }))}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Smart pricing will adjust this price based on demand and peak hours.
                    </p>
                  </div>

                  {/* Recipe Section */}
             <div className="space-y-4">
               <h4 className="text-sm font-medium text-black">Recipe Ingredients</h4>
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                   <p className="text-sm text-muted-foreground">Add ingredients and quantities for this product</p>
                   <Button
                     type="button"
                     variant="outline"
                     size="sm"
                     onClick={handleAddIngredientToProduct}
                   >
                     <Plus className="w-4 h-4 mr-2" />
                     Add Ingredient
                   </Button>
                 </div>

                 {addProductRecipe.length === 0 ? (
                   <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                     <Package className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                     <p className="text-sm text-muted-foreground mb-3">
                       No ingredients added yet
                     </p>
                     <p className="text-xs text-muted-foreground">
                       Click "Add Ingredient" to start building your recipe
                     </p>
                   </div>
                 ) : (
                   <div className="space-y-3">
                     {addProductRecipe.map((ingredient) => (
                       <div key={ingredient.id} className="flex items-center gap-3 p-3 border rounded-lg">
                         <div className="flex-1 grid grid-cols-4 gap-3">
                           <div className="flex flex-col">
                             <label className="text-xs text-muted-foreground mb-1">Ingredient</label>
                             <Select
                               value={ingredient.ingredientId}
                               onValueChange={(value) => handleUpdateIngredientInProduct(ingredient.id, 'ingredientId', value)}
                             >
                               <SelectTrigger className="h-8">
                                 <SelectValue placeholder="Select ingredient" />
                               </SelectTrigger>
                               <SelectContent>
                                 {sampleIngredients.map((ing) => (
                                   <SelectItem key={ing.id} value={ing.id}>
                                     {ing.name}
                                   </SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                           </div>
                           
                           <div className="flex flex-col">
                             <label className="text-xs text-muted-foreground mb-1">Quantity</label>
                             <Input
                               type="number"
                               step="0.01"
                               min="0"
                               value={ingredient.quantity}
                               onChange={(e) => handleUpdateIngredientInProduct(ingredient.id, 'quantity', e.target.value)}
                               placeholder="0.00"
                               className="h-8"
                             />
                           </div>
                           
                           <div className="flex flex-col">
                             <label className="text-xs text-muted-foreground mb-1">Unit</label>
                             <Select
                               value={ingredient.unit}
                               onValueChange={(value) => handleUpdateIngredientInProduct(ingredient.id, 'unit', value)}
                             >
                               <SelectTrigger className="h-8">
                                 <SelectValue />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="kg">kg</SelectItem>
                                 <SelectItem value="g">g</SelectItem>
                                 <SelectItem value="L">L</SelectItem>
                                 <SelectItem value="ml">ml</SelectItem>
                                 <SelectItem value="pieces">pieces</SelectItem>
                                 <SelectItem value="cups">cups</SelectItem>
                                 <SelectItem value="tbsp">tbsp</SelectItem>
                                 <SelectItem value="tsp">tsp</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
                           
                           <div className="flex items-end">
                             <Button
                               type="button"
                               variant="outline"
                               size="sm"
                               onClick={() => handleRemoveIngredientFromProduct(ingredient.id)}
                               className="h-8 w-8 p-0"
                             >
                               <X className="h-4 w-4" />
                             </Button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={resetAddProductForm}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddProduct}
                    disabled={!newProduct.name.trim() || !newProduct.basePrice}
                  >
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>


        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 pr-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "All" },
              { value: "Hot Drinks", label: "Hot Drinks" },
              { value: "Cold Drinks", label: "Cold Drinks" },
              { value: "Pastries", label: "Pastries" },
              { value: "Tea/Matcha", label: "Tea/Matcha" }
            ].map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchQuery && selectedCategory !== "all" 
                ? `No ${selectedCategory.toLowerCase()} match "${searchQuery}"`
                : searchQuery 
                ? `No products match "${searchQuery}"`
                : selectedCategory !== "all"
                ? `No ${selectedCategory.toLowerCase()} available`
                : "No products available"
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="outline" className="text-xs font-mono">
                      ID: {product.id}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>{product.category}</span>
                  </CardDescription>
                </div>
                  <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Current Price */}
                <div className="text-center">
                  <div className="text-3xl font-bold">${product.currentPrice}</div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Base Price</span>
                    <span>${product.basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Peak Price</span>
                    <span className="flex items-center space-x-1">
                      <span>${product.peakPrice}</span>
                      {isPeakHour() && <TrendingUp className="w-3 h-3 text-black" />}
                    </span>
                  </div>
                </div>

                {/* Inventory Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Inventory</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{product.inventory}</span>
                      {product.inventory < 15 && (
                        <AlertCircle className="w-3 h-3 text-black" />
                      )}
                    </div>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: '#e6eaf7' }}>
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((product.inventory / 50) * 100, 100)}%`,
                        backgroundColor: '#2c4170'
                      }}
                    />
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground text-center">
                  Updated {product.lastUpdated}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenPeakHoursDialog(product.id.toString())}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Peak Hours
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenIngredientsDialog(product.id.toString())}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Ingredients
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {/* Product Peak Hours Dialog */}
        <ProductPeakHoursDialog
          open={peakHoursDialogOpen}
          onOpenChange={setPeakHoursDialogOpen}
          onSave={handleSavePeakHoursSettings}
          productName={selectedProductId ? products.find(p => p.id.toString() === selectedProductId)?.name || 'Product' : 'Product'}
          productBasePrice={selectedProductId ? products.find(p => p.id.toString() === selectedProductId)?.basePrice || 0 : 0}
          productPeakPrice={selectedProductId ? products.find(p => p.id.toString() === selectedProductId)?.peakPrice || 0 : 0}
          initialSettings={selectedProductId ? peakHourSettings[selectedProductId] || getDefaultPeakHourSettings() : getDefaultPeakHourSettings()}
        />

        {/* Global Smart Pricing Dialog */}
        <GlobalSmartPricingDialog
          open={globalSmartPricingDialogOpen}
          onOpenChange={setGlobalSmartPricingDialogOpen}
          onSave={handleSaveGlobalSmartPricingSettings}
          initialSettings={globalSmartPricingSettings}
        />

        {/* Product Ingredients Dialog */}
        <ProductIngredientsDialog
          open={ingredientsDialogOpen}
          onOpenChange={setIngredientsDialogOpen}
          productName={selectedProductForIngredients ? products.find(p => p.id.toString() === selectedProductForIngredients)?.name || 'Product' : 'Product'}
          productId={selectedProductForIngredients || ''}
          ingredients={sampleIngredients}
          recipe={selectedProductForIngredients ? sampleRecipes[selectedProductForIngredients] || [] : []}
        />



      </div>
  );
}
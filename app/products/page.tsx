"use client"

import React from "react";
import { MainLayout } from "@/app/components/main-layout";
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
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { inventoryService } from "@/lib/services/inventory";
import { PeakHour, DayPeakHours, PeakHourSettings, DAYS_OF_WEEK } from "@/lib/types/peak-hours";
import { ProductPeakHoursDialog } from "@/app/components/product-peak-hours-dialog";
import { GlobalSmartPricingDialog } from "@/app/components/global-smart-pricing-dialog";

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
  
  // State for peak hours dialog
  const [peakHoursDialogOpen, setPeakHoursDialogOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  
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
    category: "Hot Drinks",
    basePrice: "",
    minPrice: "",
    maxPrice: "",
    inventory: "",
    status: "active"
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
    if (!newProduct.name.trim() || !newProduct.basePrice || !newProduct.minPrice || !newProduct.maxPrice || !newProduct.inventory) {
      return; // Basic validation
    }
    
    const basePrice = parseFloat(newProduct.basePrice);
    const minPrice = parseFloat(newProduct.minPrice);
    const maxPrice = parseFloat(newProduct.maxPrice);
    
    // Validate price ranges
    if (minPrice >= maxPrice || basePrice < minPrice || basePrice > maxPrice) {
      return; // Invalid price ranges
    }
    
    const product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: newProduct.name.trim(),
      category: newProduct.category,
      currentPrice: basePrice, // Start with base price
      basePrice: basePrice,
      peakPrice: maxPrice, // Keep peakPrice for compatibility
      wastePrevention: Math.floor(Math.random() * 20), // System calculated
      inventory: parseInt(newProduct.inventory),
      status: newProduct.status,
      lastUpdated: "Just now"
    };
    
    // Add the product to the state
    setProducts(prev => [...prev, product]);
    
    // Reset form and close dialog
    setNewProduct({
      name: "",
      category: "Hot Drinks",
      basePrice: "",
      minPrice: "",
      maxPrice: "",
      inventory: "",
      status: "active"
    });
    setIsAddProductOpen(false);
  };

  const resetAddProductForm = () => {
    setNewProduct({
      name: "",
      category: "Hot Drinks",
      basePrice: "",
      minPrice: "",
      maxPrice: "",
      inventory: "",
      status: "active"
    });
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
    <MainLayout>
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
                    Create a new product with pricing and inventory settings.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Product Name *</Label>
                        <Input
                          id="product-name"
                          placeholder="e.g., Vanilla Latte"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-category">Category *</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hot Drinks">Hot Drinks</SelectItem>
                            <SelectItem value="Cold Drinks">Cold Drinks</SelectItem>
                            <SelectItem value="Pastries">Pastries</SelectItem>
                            <SelectItem value="Tea/Matcha">Tea/Matcha</SelectItem>
                            <SelectItem value="Breakfast">Breakfast</SelectItem>
                            <SelectItem value="Dessert">Dessert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-black">Pricing Range</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="min-price">Minimum Price ($) *</Label>
                        <Input
                          id="min-price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="3.50"
                          value={newProduct.minPrice}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, minPrice: e.target.value }))}
                        />
                      </div>
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
                      <div className="space-y-2">
                        <Label htmlFor="max-price">Maximum Price ($) *</Label>
                        <Input
                          id="max-price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="5.00"
                          value={newProduct.maxPrice}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, maxPrice: e.target.value }))}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Smart pricing will adjust within this range based on demand and peak hours.
                    </p>
                  </div>

                  {/* Inventory */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="inventory">Initial Inventory *</Label>
                        <Input
                          id="inventory"
                          type="number"
                          min="0"
                          placeholder="25"
                          value={newProduct.inventory}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, inventory: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-status">Status</Label>
                        <Select
                          value={newProduct.status}
                          onValueChange={(value) => setNewProduct(prev => ({ ...prev, status: value }))}
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
                  <Button variant="outline" onClick={resetAddProductForm}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddProduct}
                    disabled={!newProduct.name.trim() || !newProduct.basePrice || !newProduct.minPrice || !newProduct.maxPrice || !newProduct.inventory}
                  >
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Smart Features Status */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Global Smart Pricing Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-black" />
                  <div>
                    <p className="font-medium text-black">
                      {globalSmartPricingSettings.enabled ? "Global Smart Pricing Active" : "Global Smart Pricing Disabled"}
                    </p>
                    <p className="text-sm text-black">
                      {globalSmartPricingSettings.enabled 
                        ? `${globalSmartPricingSettings.priceParameters.pricingStrategy === 'multiplier' ? 'Multiplier' : 'Range'} approach: ${globalSmartPricingSettings.priceParameters.minPricePercentage}% - ${globalSmartPricingSettings.priceParameters.maxPricePercentage}%`
                        : "Toggle above to enable global smart pricing for all products"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="text-black" style={{ backgroundColor: globalSmartPricingSettings.enabled ? '#e6eaf7' : '#f3f4f6' }}>
                    {globalSmartPricingSettings.enabled ? "Active" : "Disabled"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGlobalSmartPricingDialogOpen(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>


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
                    <CardTitle className="text-lg">{product.name}</CardTitle>
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
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
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

      </div>
    </MainLayout>
  );
}
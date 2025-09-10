"use client"

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
  TrendingDown
} from "lucide-react";
import { inventoryService } from "@/lib/services/inventory";

export default function Products() {
  // Calculate waste prevention pricing for each product
  const getWastePreventionPricing = (productId: string) => {
    return inventoryService.getWastePreventionPricing(productId.toString());
  };

  const products = [
    {
      id: 1,
      name: "Espresso",
      category: "Coffee",
      currentPrice: 3.50,
      basePrice: 3.25,
      peakPrice: 3.75,
      wastePrevention: 0,
      inventory: 45,
      status: "active",
      lastUpdated: "2 min ago"
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "Coffee",
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
      category: "Coffee",
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
      category: "Pastry",
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
      category: "Pastry",
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
      category: "Coffee",
      currentPrice: 3.25,
      basePrice: 3.00,
      peakPrice: 3.50,
      wastePrevention: 0,
      inventory: 32,
      status: "active",
      lastUpdated: "45 min ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "out": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Peak Hour Status */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  {isPeakHour() ? "Peak Hours Active" : "Off-Peak Hours"}
                </p>
                <p className="text-sm text-blue-700">
                  {isPeakHour() 
                    ? "Prices are automatically increased during high-demand periods" 
                    : "Standard pricing is currently active"
                  }
                </p>
              </div>
              <Badge className={isPeakHour() ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                {isPeakHour() ? "Peak" : "Off-Peak"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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
                  <Badge className={getStatusColor(product.status)}>
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
                      {isPeakHour() && <TrendingUp className="w-3 h-3 text-blue-600" />}
                    </span>
                  </div>
                  {product.wastePrevention > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-orange-600" />
                        <span>Waste Prevention</span>
                      </span>
                      <span className="text-orange-600">-{product.wastePrevention}%</span>
                    </div>
                  )}
                </div>

                {/* Inventory Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Inventory</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{product.inventory}</span>
                      {product.inventory < 15 && (
                        <AlertCircle className="w-3 h-3 text-yellow-600" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        product.inventory < 10 ? 'bg-red-500' : 
                        product.inventory < 20 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((product.inventory / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground text-center">
                  Updated {product.lastUpdated}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
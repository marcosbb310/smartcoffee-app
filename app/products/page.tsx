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
  TrendingDown
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { inventoryService } from "@/lib/services/inventory";

export default function Products() {
  // State for peak hour settings
  const [peakHourSettings, setPeakHourSettings] = React.useState<{[key: string]: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  }}>({});

  // Calculate waste prevention pricing for each product
  const getWastePreventionPricing = (productId: string) => {
    return inventoryService.getWastePreventionPricing(productId.toString());
  };

  // Handle peak hour settings update
  const updatePeakHourSettings = (productId: string, settings: {enabled: boolean, startTime: string, endTime: string}) => {
    setPeakHourSettings(prev => ({
      ...prev,
      [productId]: settings
    }));
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Peak Hour Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-black" />
              <div>
                <p className="font-medium text-black">
                  {isPeakHour() ? "Peak Hours Active" : "Off-Peak Hours"}
                </p>
                <p className="text-sm text-black">
                  {isPeakHour() 
                    ? "Prices are automatically increased during high-demand periods" 
                    : "Standard pricing is currently active"
                  }
                </p>
              </div>
                  <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Clock className="w-4 h-4 mr-2" />
                        Peak Hours
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Peak Hour Settings - {product.name}</DialogTitle>
                        <DialogDescription>
                          Configure when peak hour pricing should be active for this product.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="peak-enabled" className="text-sm font-medium">
                            Enable Peak Hour Pricing
                          </Label>
                          <Switch
                            id="peak-enabled"
                            checked={peakHourSettings[product.id]?.enabled || false}
                            onCheckedChange={(checked) => 
                              updatePeakHourSettings(product.id, {
                                ...peakHourSettings[product.id],
                                enabled: checked,
                                startTime: peakHourSettings[product.id]?.startTime || "07:00",
                                endTime: peakHourSettings[product.id]?.endTime || "09:00"
                              })
                            }
                          />
                        </div>
                        {peakHourSettings[product.id]?.enabled && (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Select
                                  value={peakHourSettings[product.id]?.startTime || "07:00"}
                                  onValueChange={(value) => 
                                    updatePeakHourSettings(product.id, {
                                      ...peakHourSettings[product.id],
                                      startTime: value
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({length: 24}, (_, i) => {
                                      const hour = i.toString().padStart(2, '0');
                                      return (
                                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                          {hour}:00
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Select
                                  value={peakHourSettings[product.id]?.endTime || "09:00"}
                                  onValueChange={(value) => 
                                    updatePeakHourSettings(product.id, {
                                      ...peakHourSettings[product.id],
                                      endTime: value
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({length: 24}, (_, i) => {
                                      const hour = i.toString().padStart(2, '0');
                                      return (
                                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                          {hour}:00
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Peak pricing: ${product.peakPrice} (vs ${product.basePrice} base)
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
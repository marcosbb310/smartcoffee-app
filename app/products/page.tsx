"use client"

import { useState } from "react";
import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Slider } from "@/app/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  Coffee, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MoreHorizontal
} from "lucide-react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Americano",
    category: "Coffee",
    basePrice: 4.00,
    currentPrice: 4.50,
    demand: 70,
    inventory: 85,
    pricingRule: "Peak Hours",
    status: "active"
  },
  {
    id: 2,
    name: "Latte",
    category: "Coffee",
    basePrice: 5.50,
    currentPrice: 6.80,
    demand: 92,
    inventory: 60,
    pricingRule: "High Demand",
    status: "active"
  },
  {
    id: 3,
    name: "Cappuccino",
    category: "Coffee",
    basePrice: 5.00,
    currentPrice: 5.75,
    demand: 78,
    inventory: 90,
    pricingRule: "Peak Hours",
    status: "active"
  },
  {
    id: 4,
    name: "Espresso",
    category: "Coffee",
    basePrice: 3.50,
    currentPrice: 4.00,
    demand: 65,
    inventory: 95,
    pricingRule: "Low Inventory",
    status: "active"
  },
  {
    id: 5,
    name: "Muffin",
    category: "Pastry",
    basePrice: 3.00,
    currentPrice: 3.00,
    demand: 45,
    inventory: 100,
    pricingRule: "None",
    status: "inactive"
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [pricingRules, setPricingRules] = useState({
    peakHours: true,
    demandThreshold: 80,
    inventoryThreshold: 20,
    maxIncrease: 25
  });

  return (
    <MainLayout>
      <div className="w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Products & Pricing</h2>
            <p className="text-muted-foreground">Manage your menu items and pricing rules</p>
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your menu and configure its pricing rules.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="e.g., Americano" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coffee">Coffee</SelectItem>
                        <SelectItem value="pastry">Pastry</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="basePrice">Base Price ($)</Label>
                    <Input id="basePrice" type="number" step="0.01" placeholder="4.00" />
                  </div>
                  <div>
                    <Label htmlFor="inventory">Initial Inventory</Label>
                    <Input id="inventory" type="number" placeholder="100" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>Manage your products and their current pricing status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Demand</TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead>Pricing Rule</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>${product.basePrice}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">${product.currentPrice}</span>
                            {product.currentPrice > product.basePrice && (
                              <Badge variant="default" className="text-xs">
                                +{((product.currentPrice - product.basePrice) / product.basePrice * 100).toFixed(0)}%
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{product.demand}%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${product.demand}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{product.inventory}%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  product.inventory < 30 ? 'bg-destructive' : 
                                  product.inventory < 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${product.inventory}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.pricingRule === "None" ? "outline" : "secondary"}>
                            {product.pricingRule}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.status === "active" ? "default" : "outline"}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Peak Hours Rule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Peak Hours Pricing</span>
                  </CardTitle>
                  <CardDescription>
                    Automatically increase prices during busy periods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="peak-hours">Enable Peak Hours</Label>
                    <Switch 
                      id="peak-hours" 
                      checked={pricingRules.peakHours}
                      onCheckedChange={(checked) => 
                        setPricingRules({...pricingRules, peakHours: checked})
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Peak Hours Schedule</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input id="start-time" type="time" defaultValue="07:00" />
                      </div>
                      <div>
                        <Label htmlFor="end-time">End Time</Label>
                        <Input id="end-time" type="time" defaultValue="09:00" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Price Increase: {pricingRules.maxIncrease}%</Label>
                    <Slider
                      value={[pricingRules.maxIncrease]}
                      onValueChange={(value) => 
                        setPricingRules({...pricingRules, maxIncrease: value[0]})
                      }
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Demand-Based Rule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Demand-Based Pricing</span>
                  </CardTitle>
                  <CardDescription>
                    Adjust prices based on real-time demand patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Demand Threshold: {pricingRules.demandThreshold}%</Label>
                    <Slider
                      value={[pricingRules.demandThreshold]}
                      onValueChange={(value) => 
                        setPricingRules({...pricingRules, demandThreshold: value[0]})
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      When demand exceeds this threshold, prices will increase
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Inventory Threshold: {pricingRules.inventoryThreshold}%</Label>
                    <Slider
                      value={[pricingRules.inventoryThreshold]}
                      onValueChange={(value) => 
                        setPricingRules({...pricingRules, inventoryThreshold: value[0]})
                      }
                      max={50}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      When inventory drops below this level, prices will increase
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Rule Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Active Rules Summary</CardTitle>
                  <CardDescription>Current pricing rules and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Peak Hours</p>
                        <p className="text-sm text-muted-foreground">7:00 AM - 9:00 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">High Demand</p>
                        <p className="text-sm text-muted-foreground">Above 80% demand</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Low Inventory</p>
                        <p className="text-sm text-muted-foreground">Below 20% stock</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Manage your product categories and their pricing settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {["Coffee", "Pastry", "Food", "Beverage"].map((category) => (
                    <Card key={category} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{category}</h3>
                        <Badge variant="outline">12 items</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Average price increase: +18.5%
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Rules
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

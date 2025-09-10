"use client"

import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ChartAreaInteractive } from "@/app/components/ui/chart-area-interactive";
import { 
  Clock, 
  Package, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  ShoppingCart
} from "lucide-react";
import { inventoryService } from "@/lib/services/inventory";

export default function Dashboard() {
  const inventoryStatus = inventoryService.getInventoryStatus();
  const reorderSuggestions = inventoryService.getReorderSuggestions();
  const posStatus = inventoryService.getPOSConnectionStatus();
  
  return (
    <MainLayout>
      <div className="space-y-6" style={{ background: '#ffffff', minHeight: '100vh', padding: '2rem' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Smart Coffee</h1>
            <p className="text-muted-foreground">
              Intelligent pricing and inventory management
            </p>
          </div>
          
          {/* System Status */}
          <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">System Active</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              Live
            </Badge>
            <div className="text-xs text-muted-foreground">
              {posStatus.productsSynced} products synced
            </div>
          </div>
        </div>

        {/* Revenue Impact Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's Revenue Impact */}
          <Card className="border-purple-100" style={{ background: 'linear-gradient(to bottom right, #fefbff, #e9d5ff)' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Today's Revenue Impact</h3>
                    <p className="text-sm text-purple-700">Smart pricing vs regular pricing</p>
                  </div>
                </div>
                <Badge className="bg-amber-600 text-white text-sm px-3 py-1">
                  +$487
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-800 font-medium">Additional Revenue</span>
                  <span className="text-2xl font-bold text-purple-900">$487</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700">From smart pricing today</span>
                  <span className="text-amber-600 font-medium">+23% increase</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Projection */}
          <Card className="border-purple-100" style={{ background: 'linear-gradient(to bottom right, #fefbff, #e9d5ff)' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Monthly Projection</h3>
                    <p className="text-sm text-purple-700">Based on current performance</p>
                  </div>
                </div>
                <Badge className="bg-amber-600 text-white text-sm px-3 py-1">
                  +$14,610
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-800 font-medium">Extra Monthly Revenue</span>
                  <span className="text-2xl font-bold text-purple-900">$14,610</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700">Projected from today's data</span>
                  <span className="text-amber-600 font-medium">+$4,870/week</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Features Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Smart Pricing */}
          <Card style={{ background: 'linear-gradient(to bottom right, #fefbff, #e9d5ff)' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-800" />
                <span className="text-purple-900">Smart Pricing</span>
              </CardTitle>
              <CardDescription>
                AI-powered pricing based on peak hours and inventory levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-100 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">+23%</div>
                  <p className="text-sm text-muted-foreground">Peak Hour Revenue</p>
                </div>
                <div className="text-center p-4 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">-15%</div>
                  <p className="text-sm text-muted-foreground">Waste Prevention</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Current Peak Pricing</span>
                  <Badge className="bg-purple-200 text-purple-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Waste Prevention</span>
                  <Badge className="bg-purple-200 text-purple-800">3 items</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Management */}
          <Card style={{ background: 'linear-gradient(to bottom right, #fefbff, #e9d5ff)' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-800" />
                <span className="text-purple-900">Inventory Management</span>
              </CardTitle>
              <CardDescription>
                Automated tracking and reordering of ingredients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-100 rounded-lg">
                  <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{inventoryStatus.totalIngredients}</div>
                  <p className="text-sm text-muted-foreground">Ingredients Tracked</p>
                </div>
                <div className="text-center p-4 bg-purple-100 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{inventoryStatus.lowStockItems}</div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Auto Reordering</span>
                  <Badge className="bg-purple-200 text-purple-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Reorder Suggestions</span>
                  <Badge className="bg-purple-200 text-purple-800">
                    {reorderSuggestions.length} items
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Comparison Chart */}
        <div style={{ background: 'linear-gradient(to bottom right, #fefbff, #e9d5ff)', borderRadius: '0.75rem', padding: '1.5rem' }}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-900">Revenue Comparison</h3>
            <p className="text-sm text-purple-700">
              Smart pricing vs regular pricing performance over time
            </p>
          </div>
          <ChartAreaInteractive />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your smart pricing and inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Package className="h-6 w-6" />
                <span>View Products</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <ShoppingCart className="h-6 w-6" />
                <span>Reorder Items</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Zap className="h-6 w-6" />
                <span>Pricing Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {reorderSuggestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span>Reorder Needed</span>
              </CardTitle>
              <CardDescription>
                Items that need to be reordered soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reorderSuggestions.slice(0, 3).map((suggestion) => (
                  <div key={suggestion.ingredient.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{suggestion.ingredient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Current: {suggestion.ingredient.currentStock} {suggestion.ingredient.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={
                        suggestion.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                        suggestion.urgency === 'high' ? 'bg-orange-100 text-purple-800' :
                        'bg-yellow-100 text-purple-800'
                      }>
                        {suggestion.urgency}
                      </Badge>
                      <Button size="sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
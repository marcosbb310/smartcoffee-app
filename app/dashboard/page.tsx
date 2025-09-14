"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ChartAreaInteractive } from "@/app/components/ui/chart-area-interactive";
import { 
  Clock, 
  Package, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  ShoppingCart,
  Settings,
  Target
} from "lucide-react";
import { inventoryService } from "@/lib/services/inventory";

export default function Dashboard() {
  const inventoryStatus = inventoryService.getInventoryStatus();
  const reorderSuggestions = inventoryService.getReorderSuggestions();
  const posStatus = inventoryService.getPOSConnectionStatus();
  
  return (
    <div className="space-y-6" style={{ background: '#ffffff', minHeight: '100vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Napoleon Dashboard</h1>
            <p className="text-muted-foreground">
              Business intelligence and smart management
            </p>
          </div>
          
          {/* System Status */}
          <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-black" />
              <span className="text-sm font-medium">System Active</span>
            </div>
            <Badge variant="secondary" className="text-black text-xs" style={{ backgroundColor: '#fef3c7' }}>
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
          <Card className="border-gray-200" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' }}>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-semibold text-black">Today's Revenue Impact</h3>
                </div>
                <p className="text-sm text-black">Smart pricing vs regular pricing</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Additional Revenue</span>
                  <span className="text-2xl font-bold text-black">$487</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">From smart pricing today</span>
                  <span className="text-black font-medium">+23% increase</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: '#e6eaf7' }}>
                  <div className="h-2 rounded-full" style={{ width: '23%', backgroundColor: '#2c4170' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Projection */}
          <Card className="border-gray-200" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' }}>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Target className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-semibold text-black">Monthly Projection</h3>
                </div>
                <p className="text-sm text-black">Based on current performance</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium">Extra Monthly Revenue</span>
                  <span className="text-2xl font-bold text-black">$14,610</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Projected from today's data</span>
                  <span className="text-black font-medium">+$4,870/week</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: '#e6eaf7' }}>
                  <div className="h-2 rounded-full" style={{ width: '78%', backgroundColor: '#2c4170' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Features Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Smart Pricing */}
          <Card style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' }}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 mb-2">
                <Settings className="h-5 w-5 text-black" />
                <span className="text-black">Smart Pricing</span>
              </CardTitle>
              <CardDescription>
                AI-powered pricing optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#e6eaf7' }}>
                  <Clock className="h-6 w-6 text-black mx-auto mb-1" />
                  <div className="text-xl font-bold text-black">+23%</div>
                  <p className="text-xs text-muted-foreground">Peak Hour Revenue</p>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#e6eaf7' }}>
                  <TrendingUp className="h-6 w-6 text-black mx-auto mb-1" />
                  <div className="text-xl font-bold text-black">-15%</div>
                  <p className="text-xs text-muted-foreground">Waste Prevention</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Current Peak Pricing</span>
                  <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Waste Prevention</span>
                  <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>3 items</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Management */}
          <Card style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' }}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 mb-2">
                <Package className="h-5 w-5 text-black" />
                <span className="text-black">Inventory Management</span>
              </CardTitle>
              <CardDescription>
                Automated tracking and reordering of ingredients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#e6eaf7' }}>
                  <Package className="h-6 w-6 text-black mx-auto mb-1" />
                  <div className="text-xl font-bold text-black">{inventoryStatus.totalIngredients}</div>
                  <p className="text-xs text-muted-foreground">Ingredients Tracked</p>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#e6eaf7' }}>
                  <AlertTriangle className="h-6 w-6 text-black mx-auto mb-1" />
                  <div className="text-xl font-bold text-black">{inventoryStatus.lowStockItems}</div>
                  <p className="text-xs text-muted-foreground">Low Stock</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Auto Reordering</span>
                  <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Reorder Suggestions</span>
                  <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>
                    {reorderSuggestions.length} items
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Comparison Chart */}
        <ChartAreaInteractive />


        {/* Recent Activity */}
        {reorderSuggestions.length > 0 && (
          <Card style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-black" />
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
                      <Badge className="text-black" style={{ backgroundColor: '#fef3c7' }}>
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
  );
}
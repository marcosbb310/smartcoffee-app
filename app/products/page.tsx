import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Coffee,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  Package,
  BarChart3,
  Settings,
  Download,
  Upload,
  Eye,
  Trash2,
  Copy,
  Star
} from "lucide-react";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Espresso",
      category: "Coffee",
      currentPrice: 3.50,
      previousPrice: 3.25,
      change: "+7.7%",
      trend: "up",
      inventory: 45,
      status: "active",
      lastUpdated: "2 min ago",
      revenue: 1247,
      orders: 89,
      rating: 4.8
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "Coffee",
      currentPrice: 4.25,
      previousPrice: 4.50,
      change: "-5.6%",
      trend: "down",
      inventory: 12,
      status: "low",
      lastUpdated: "15 min ago",
      revenue: 892,
      orders: 67,
      rating: 4.6
    },
    {
      id: 3,
      name: "Latte",
      category: "Coffee",
      currentPrice: 4.75,
      previousPrice: 4.75,
      change: "0%",
      trend: "stable",
      inventory: 28,
      status: "active",
      lastUpdated: "1 hour ago",
      revenue: 1567,
      orders: 112,
      rating: 4.9
    },
    {
      id: 4,
      name: "Croissant",
      category: "Pastry",
      currentPrice: 2.95,
      previousPrice: 2.75,
      change: "+7.3%",
      trend: "up",
      inventory: 8,
      status: "low",
      lastUpdated: "30 min ago",
      revenue: 445,
      orders: 34,
      rating: 4.4
    },
    {
      id: 5,
      name: "Muffin",
      category: "Pastry",
      currentPrice: 3.25,
      previousPrice: 3.25,
      change: "0%",
      trend: "stable",
      inventory: 15,
      status: "active",
      lastUpdated: "2 hours ago",
      revenue: 678,
      orders: 52,
      rating: 4.5
    },
    {
      id: 6,
      name: "Americano",
      category: "Coffee",
      currentPrice: 3.25,
      previousPrice: 3.00,
      change: "+8.3%",
      trend: "up",
      inventory: 32,
      status: "active",
      lastUpdated: "45 min ago",
      revenue: 934,
      orders: 71,
      rating: 4.7
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <MainLayout>
      <div className="w-full space-y-8">
        {/* Header - Modern */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your menu items and pricing strategy</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-1" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search products, categories, or prices..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Price</p>
                  <p className="text-2xl font-bold">$3.74</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid - Default View */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Menu Items</h2>
              <p className="text-muted-foreground">Current pricing and performance data</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Coffee className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="outline">{product.category}</Badge>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="text-right">
                      <div className="text-xl font-bold">${product.currentPrice}</div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(product.trend)}
                        <span className={`text-xs font-medium ${
                          product.trend === 'up' ? 'text-green-600' : 
                          product.trend === 'down' ? 'text-red-600' : 
                          'text-gray-600'
                        }`}>
                          {product.change}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Revenue & Inventory */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="text-sm font-medium">${product.revenue}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Inventory</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{product.inventory}</span>
                      {product.inventory < 15 && (
                        <AlertCircle className="w-3 h-3 text-yellow-600" />
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={`text-xs ${getStatusColor(product.status)}`}>
                      {product.status === 'active' ? 'In Stock' : 
                       product.status === 'low' ? 'Low Stock' : 
                       'Out of Stock'}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Last Updated */}
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground text-center">
                      Updated {product.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Quick Actions - Modern */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <Edit className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Bulk Update</h3>
              <p className="text-sm text-muted-foreground">Update multiple items at once</p>
              <Button variant="outline" className="w-full">
                Select Items
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <Clock className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Peak Hours</h3>
              <p className="text-sm text-muted-foreground">Configure rush hour pricing</p>
              <Button variant="outline" className="w-full">
                Set Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <AlertCircle className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Inventory Alerts</h3>
              <p className="text-sm text-muted-foreground">Manage low stock notifications</p>
              <Button variant="outline" className="w-full">
                Configure
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <BarChart3 className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Analytics</h3>
              <p className="text-sm text-muted-foreground">View detailed performance data</p>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
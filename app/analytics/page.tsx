"use client"

import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/app/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Coffee, 
  BarChart3,
  Download,
  Calendar,
  Filter
} from "lucide-react";

// Sample analytics data
const revenueData = [
  { name: "Jan", revenue: 12000, target: 10000, profit: 8000 },
  { name: "Feb", revenue: 15000, target: 10000, profit: 10000 },
  { name: "Mar", revenue: 18000, target: 10000, profit: 12000 },
  { name: "Apr", revenue: 22000, target: 10000, profit: 15000 },
  { name: "May", revenue: 28000, target: 10000, profit: 19000 },
  { name: "Jun", revenue: 32000, target: 10000, profit: 22000 },
];

const productPerformance = [
  { name: "Americano", revenue: 4500, orders: 120, avgPrice: 3.75, priceIncrease: 15.2 },
  { name: "Latte", revenue: 6800, orders: 95, avgPrice: 7.16, priceIncrease: 23.6 },
  { name: "Cappuccino", revenue: 5200, orders: 80, avgPrice: 6.50, priceIncrease: 18.0 },
  { name: "Espresso", revenue: 3200, orders: 100, avgPrice: 3.20, priceIncrease: 12.5 },
  { name: "Muffin", revenue: 1500, orders: 50, avgPrice: 3.00, priceIncrease: 0 },
];

const hourlyData = [
  { hour: "6 AM", orders: 15, revenue: 120, avgPrice: 8.0 },
  { hour: "7 AM", orders: 45, revenue: 360, avgPrice: 8.0 },
  { hour: "8 AM", orders: 65, revenue: 520, avgPrice: 8.0 },
  { hour: "9 AM", orders: 40, revenue: 320, avgPrice: 8.0 },
  { hour: "10 AM", orders: 25, revenue: 200, avgPrice: 8.0 },
  { hour: "11 AM", orders: 30, revenue: 240, avgPrice: 8.0 },
  { hour: "12 PM", orders: 55, revenue: 440, avgPrice: 8.0 },
  { hour: "1 PM", orders: 60, revenue: 480, avgPrice: 8.0 },
  { hour: "2 PM", orders: 35, revenue: 280, avgPrice: 8.0 },
  { hour: "3 PM", orders: 20, revenue: 160, avgPrice: 8.0 },
  { hour: "4 PM", orders: 25, revenue: 200, avgPrice: 8.0 },
  { hour: "5 PM", orders: 30, revenue: 240, avgPrice: 8.0 },
];

const pricingImpact = [
  { category: "Coffee", beforePricing: 4500, afterPricing: 5200, increase: 15.6 },
  { category: "Pastry", beforePricing: 1200, afterPricing: 1200, increase: 0 },
  { category: "Food", beforePricing: 2800, afterPricing: 3200, increase: 14.3 },
  { category: "Beverage", beforePricing: 1800, afterPricing: 2100, increase: 16.7 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-3))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-4))",
  },
};

export default function Analytics() {
  return (
    <MainLayout>
      <div className="w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Analytics & Insights</h2>
            <p className="text-muted-foreground">Track performance and optimize your pricing strategy</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="30d">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32,400</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +28.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price Increase</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18.2%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68.5%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue vs target over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stackId="1" 
                      stroke="var(--color-revenue)" 
                      fill="var(--color-revenue)"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stackId="1" 
                      stroke="var(--color-target)" 
                      fill="var(--color-target)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hourly Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Performance</CardTitle>
                  <CardDescription>Orders and revenue by hour of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="orders" fill="var(--color-orders)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Revenue by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={pricingImpact}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="afterPricing"
                      >
                        {pricingImpact.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--color-revenue)" 
                      strokeWidth={3}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="var(--color-target)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="var(--color-profit)" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Individual product performance and pricing impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {product.orders} orders
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Avg: ${product.avgPrice}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">${product.revenue}</div>
                        <div className="flex items-center text-sm">
                          {product.priceIncrease > 0 ? (
                            <span className="text-green-600">
                              +{product.priceIncrease}% increase
                            </span>
                          ) : (
                            <span className="text-muted-foreground">No pricing rule</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Impact Analysis</CardTitle>
                <CardDescription>Before vs after pricing implementation by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <BarChart data={pricingImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="beforePricing" fill="var(--color-chart-1)" name="Before Pricing" />
                    <Bar dataKey="afterPricing" fill="var(--color-chart-2)" name="After Pricing" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Revenue Increase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">+$4,200</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Additional revenue from smart pricing
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Price Lift</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">+18.2%</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Average price increase across all products
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">340%</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Return on investment for pricing system
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

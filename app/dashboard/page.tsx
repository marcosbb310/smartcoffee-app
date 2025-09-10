"use client"

import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ChartAreaInteractive } from "@/app/components/ui/chart-area-interactive";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Zap
} from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Smart pricing performance and system status
            </p>
          </div>
        </div>

        {/* Essential Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Today's Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,847.50</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from yesterday
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Revenue Growth */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Smart Pricing Impact</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18.3%</div>
              <p className="text-xs text-muted-foreground">
                Revenue increase vs regular pricing
              </p>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
                <span className="text-sm text-muted-foreground">POS Active</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                47 items being dynamically priced
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Comparison Chart - Hero Element */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Revenue Comparison</CardTitle>
            <CardDescription>
              Smart pricing vs regular pricing performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6">
              <ChartAreaInteractive />
            </div>
          </CardContent>
        </Card>

        {/* Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Smart Pricing Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-green-700">Revenue Gains</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• +$487 additional revenue today</li>
                  <li>• 23% higher average order value</li>
                  <li>• 15% increase in peak hour sales</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-700">System Performance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 47 items actively managed</li>
                  <li>• 156 price adjustments today</li>
                  <li>• 99.8% uptime this month</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
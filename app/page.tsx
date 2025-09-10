"use client"

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Package, 
  Clock, 
  TrendingUp,
  BarChart3,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Zap className="w-3 h-3 mr-1" />
              Smart Coffee Management
            </Badge>
            
            <h1 className="text-6xl font-bold tracking-tight">
              Smart Coffee
              <span className="block text-4xl text-blue-600 mt-2">
                Pricing & Inventory
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Intelligent pricing based on peak hours and inventory levels, 
              with automated ingredient tracking and reordering. 
              Maximize revenue while minimizing waste.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link href="/products">
                View Products
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {/* Smart Pricing */}
            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Smart Pricing</CardTitle>
                <CardDescription className="text-base">
                  AI-powered pricing that adapts to demand and inventory levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Peak Hour Pricing</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically increase prices during high-demand periods
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Waste Prevention</p>
                      <p className="text-sm text-muted-foreground">
                        Reduce prices when ingredients are running low to prevent waste
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Revenue Impact</span>
                    <Badge className="bg-green-100 text-green-800">+23%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Management */}
            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Inventory Management</CardTitle>
                <CardDescription className="text-base">
                  Automated tracking and reordering of ingredients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Auto Tracking</p>
                      <p className="text-sm text-muted-foreground">
                        Track ingredient usage based on product sales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Smart Reordering</p>
                      <p className="text-sm text-muted-foreground">
                        Get suggestions for when and how much to reorder
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Waste Reduction</span>
                    <Badge className="bg-orange-100 text-orange-800">-15%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold">Set Up Recipes</h3>
                <p className="text-muted-foreground">
                  Define how much of each ingredient goes into each product
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold">Track Sales</h3>
                <p className="text-muted-foreground">
                  System automatically tracks ingredient usage as products are sold
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold">Smart Actions</h3>
                <p className="text-muted-foreground">
                  Get reorder suggestions and automatic price adjustments
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16 bg-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Never run out of ingredients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Maximize revenue during peak hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Reduce food waste with smart pricing</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Automated inventory tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Simple, easy-to-use interface</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Real-time insights and alerts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">
              Start managing your coffee shop smarter today
            </p>
            <Button size="lg" className="px-8" asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
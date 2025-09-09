import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowRight, BarChart3, Coffee, Settings, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">SmartPricing</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link href="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </Link>
              <Link href="/toast" className="text-muted-foreground hover:text-foreground transition-colors">
                Toast Integration
              </Link>
            </nav>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Smart Pricing for Coffee Shops
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Optimize Your Pricing with
            <span className="text-primary"> AI-Powered Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automatically adjust your menu prices based on demand, inventory, and peak hours. 
            Increase revenue while keeping customers happy with smart, data-driven pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/ui">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Optimize Pricing
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform integrates seamlessly with your existing POS system and provides 
              powerful tools to maximize your revenue.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Real-time insights into pricing performance and revenue optimization opportunities.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Dynamic Pricing</CardTitle>
                <CardDescription>
                  Automatically adjust prices based on demand patterns and inventory levels.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Easy Configuration</CardTitle>
                <CardDescription>
                  Simple setup with customizable rules for peak hours and demand triggers.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Coffee className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>POS Integration</CardTitle>
                <CardDescription>
                  Seamless integration with Toast and other major POS systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Increase Your Revenue?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join coffee shops and restaurants already using SmartPricing to optimize their pricing strategy.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SmartPricing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
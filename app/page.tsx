import { MainLayout } from "@/app/components/main-layout";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Coffee, 
  BarChart3, 
  Zap,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Shield,
  Award,
  Play,
  Download,
  ExternalLink
} from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      <div className="w-full space-y-16">
        {/* Hero Section - Modern Data Focus */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Award className="w-3 h-3 mr-1" />
                  #1 AI Pricing Platform
                </Badge>
                <h1 className="text-6xl font-bold tracking-tight">
                  Smart Pricing
                  <span className="block text-4xl text-primary mt-2">
                    Powered by AI
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your coffee shop's revenue with intelligent, data-driven pricing. 
                  Our AI analyzes demand patterns, inventory levels, and market conditions 
                  to optimize your pricing strategy in real-time.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            {/* Data Visualization Hero */}
            <div className="relative">
              <Card className="border-0 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Revenue Impact</CardTitle>
                      <CardDescription>Last 30 days performance</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+25.3%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Revenue Growth</span>
                      <span className="text-2xl font-bold">$12,847</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+23%</div>
                      <div className="text-xs text-muted-foreground">Peak Hours</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">+18%</div>
                      <div className="text-xs text-muted-foreground">Off-Peak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Section - Data Heavy */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground">Join thousands of coffee shops already using SmartPricing</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Active Locations</div>
              <div className="text-xs text-green-600">+127 this month</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Revenue Generated</div>
              <div className="text-xs text-green-600">+$340K this month</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-xs text-green-600">Last 12 months</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
              <div className="text-xs text-green-600">Based on 1,200+ reviews</div>
            </div>
          </div>
        </div>

        {/* Features - Advanced Tabs */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground">Everything you need to optimize your pricing strategy</p>
          </div>
          
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai">AI Engine</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-6 h-6 text-primary" />
                      <CardTitle>Machine Learning</CardTitle>
                    </div>
                    <CardDescription>Advanced AI algorithms analyze your data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Demand Prediction</span>
                        <Badge variant="outline">94% Accuracy</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price Optimization</span>
                        <Badge variant="outline">+23% Revenue</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Inventory Management</span>
                        <Badge variant="outline">-40% Waste</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Target className="w-6 h-6 text-primary" />
                      <CardTitle>Real-time Processing</CardTitle>
                    </div>
                    <CardDescription>Instant price updates based on live data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <Badge variant="outline">0.3s</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Points</span>
                        <Badge variant="outline">10K+/hour</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Update Frequency</span>
                        <Badge variant="outline">Real-time</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Track performance and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">+$2,847</div>
                      <div className="text-sm text-green-600">+18.2% this month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <CardTitle>Price Elasticity</CardTitle>
                    <CardDescription>Understand demand sensitivity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">0.73</div>
                      <div className="text-sm text-blue-600">Average elasticity</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <Users className="w-6 h-6 text-primary" />
                    <CardTitle>Customer Insights</CardTitle>
                    <CardDescription>Behavior and preference analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">4.9/5</div>
                      <div className="text-sm text-purple-600">Satisfaction score</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Coffee className="w-6 h-6 text-primary" />
                      <CardTitle>POS Integration</CardTitle>
                    </div>
                    <CardDescription>Seamless connection with your existing systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Toast POS</span>
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Square</span>
                        <Badge variant="outline">Available</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Clover</span>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-6 h-6 text-primary" />
                      <CardTitle>Security & Compliance</CardTitle>
                    </div>
                    <CardDescription>Enterprise-grade security and data protection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SOC 2 Type II</span>
                        <Badge className="bg-green-100 text-green-800">Certified</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">GDPR Compliant</span>
                        <Badge className="bg-green-100 text-green-800">Certified</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">PCI DSS</span>
                        <Badge className="bg-green-100 text-green-800">Level 1</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-6 h-6 text-primary" />
                      <CardTitle>Automated Pricing</CardTitle>
                    </div>
                    <CardDescription>Set it and forget it - fully automated pricing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Peak Hours</span>
                        <Badge variant="outline">Auto-adjust</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Inventory Alerts</span>
                        <Badge variant="outline">Smart pricing</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weather Impact</span>
                        <Badge variant="outline">Dynamic pricing</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <CardTitle>Revenue Optimization</CardTitle>
                    </div>
                    <CardDescription>Maximize revenue while maintaining customer satisfaction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">A/B Testing</span>
                        <Badge variant="outline">Continuous</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Competitor Analysis</span>
                        <Badge variant="outline">Real-time</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Market Trends</span>
                        <Badge variant="outline">AI-powered</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section - Data Driven */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Ready to Increase Your Revenue?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join 1,247+ coffee shops already using SmartPricing to optimize their pricing strategy. 
                Start your free trial today and see results in 24 hours.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Download Case Study
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
    </MainLayout>
  );
}
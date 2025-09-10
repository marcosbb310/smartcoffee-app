import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Coffee, 
  Clock,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Eye,
  Filter,
  RefreshCw,
  Settings,
  Activity,
  Users,
  Star,
  AlertTriangle
} from "lucide-react";

export default function Analytics() {
  return (
    <MainLayout>
      <div className="w-full space-y-8">
        {/* Header - Modern */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your pricing performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-1" />
              Last 30 days
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics - Advanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue Impact</p>
                  <p className="text-3xl font-bold">+$2,847</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+18.2%</span>
                    <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">75% of monthly target</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price Changes</p>
                  <p className="text-3xl font-bold">156</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600 font-medium">+12.5%</span>
                    <span className="text-xs text-muted-foreground ml-1">this week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={60} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">60% of weekly changes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                  <p className="text-3xl font-bold">$18.50</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+8.2%</span>
                    <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">85% of target AOV</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Peak Efficiency</p>
                  <p className="text-3xl font-bold">94%</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+5.1%</span>
                    <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={94} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">94% efficiency rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs - Advanced */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">Revenue Trend</CardTitle>
                      <CardDescription>Daily revenue over the last 30 days</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center space-y-4">
                      <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-muted-foreground">Revenue chart visualization</p>
                        <p className="text-sm text-muted-foreground">Interactive charts coming soon</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Top Performers</CardTitle>
                  <CardDescription>Best performing items this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Espresso</p>
                          <p className="text-xs text-muted-foreground">Coffee</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">+$847</p>
                        <p className="text-xs text-green-600">+23.5%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cappuccino</p>
                          <p className="text-xs text-muted-foreground">Coffee</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">+$623</p>
                        <p className="text-xs text-green-600">+18.2%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Latte</p>
                          <p className="text-xs text-muted-foreground">Coffee</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">+$445</p>
                        <p className="text-xs text-green-600">+15.8%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Key Insights</CardTitle>
                  <CardDescription>AI-generated recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Peak hours driving 23% more revenue</p>
                        <p className="text-xs text-muted-foreground">Consider extending peak pricing to 10 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Coffee category shows highest elasticity</p>
                        <p className="text-xs text-muted-foreground">Room for 5-8% price optimization</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Weekend pricing could be increased</p>
                        <p className="text-xs text-muted-foreground">Demand is 15% higher on weekends</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by category and time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center space-y-2">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Revenue breakdown chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Revenue Goals</CardTitle>
                  <CardDescription>Progress towards monthly targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Target</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Peak Hours Goal</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Weekend Target</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Price Elasticity</CardTitle>
                  <CardDescription>How price changes affect demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center space-y-2">
                      <Target className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Price elasticity chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Competitive Analysis</CardTitle>
                  <CardDescription>Your pricing vs. local competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Competitive analysis chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">System Performance</CardTitle>
                  <CardDescription>AI processing and response times</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Time</span>
                      <Badge className="bg-green-100 text-green-800">0.3s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy Rate</span>
                      <Badge className="bg-blue-100 text-blue-800">94.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Uptime</span>
                      <Badge className="bg-green-100 text-green-800">99.8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Points Processed</span>
                      <Badge className="bg-purple-100 text-purple-800">10K+/hour</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Optimization Impact</CardTitle>
                  <CardDescription>Impact of AI-driven pricing decisions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Increase</span>
                      <Badge className="bg-green-100 text-green-800">+18.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Waste Reduction</span>
                      <Badge className="bg-blue-100 text-blue-800">-12.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Customer Satisfaction</span>
                      <Badge className="bg-purple-100 text-purple-800">+8.7%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Order Volume</span>
                      <Badge className="bg-orange-100 text-orange-800">+15.3%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">AI Recommendations</CardTitle>
                  <CardDescription>Smart suggestions for optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start space-x-3">
                        <Zap className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">High Priority</p>
                          <p className="text-sm text-green-700">Increase espresso price by $0.25 during peak hours</p>
                          <p className="text-xs text-green-600 mt-1">Expected revenue impact: +$127/week</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start space-x-3">
                        <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Medium Priority</p>
                          <p className="text-sm text-blue-700">Adjust cappuccino pricing based on inventory levels</p>
                          <p className="text-xs text-blue-600 mt-1">Expected waste reduction: -8%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-orange-800">Low Priority</p>
                          <p className="text-sm text-orange-700">Extend peak hours to 10 AM on weekdays</p>
                          <p className="text-xs text-orange-600 mt-1">Expected revenue impact: +$89/week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Market Trends</CardTitle>
                  <CardDescription>External factors affecting pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Coffee Bean Prices</p>
                          <p className="text-xs text-muted-foreground">Up 3.2% this month</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+3.2%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">Foot Traffic</p>
                          <p className="text-xs text-muted-foreground">Up 12% vs last month</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">+12%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium">Competitor Pricing</p>
                          <p className="text-xs text-muted-foreground">Average +2.1% this week</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">+2.1%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
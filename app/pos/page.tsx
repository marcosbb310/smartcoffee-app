import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Link2,
  Settings,
  Shield,
  Zap,
  Coffee,
  Download,
  Upload,
  Eye,
  RefreshCw,
  ExternalLink,
  Activity,
  BarChart3,
  Target,
  Users,
  DollarSign
} from "lucide-react";

export default function POSIntegration() {
  return (
    <MainLayout>
      <div className="w-full space-y-8">
        {/* Header - Modern */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">POS Integration</h1>
            <p className="text-muted-foreground">Connect and configure your POS system</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export Logs
            </Button>
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              Integration Hub
            </Badge>
          </div>
        </div>

        {/* Connection Status - Advanced Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">POS System Connected</h3>
                  <p className="text-muted-foreground">Last synced 2 minutes ago</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Live Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">23 updates pending</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">Active</Badge>
                <Button variant="outline" size="lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Progress - Modern */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Setup Progress</h2>
            <p className="text-muted-foreground">Complete these steps to enable smart pricing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Connect POS</h3>
                  <p className="text-sm text-muted-foreground">API credentials configured</p>
                  <Badge className="bg-green-100 text-green-800 mt-2">Completed</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sync Menu</h3>
                  <p className="text-sm text-muted-foreground">47 items synchronized</p>
                  <Badge className="bg-green-100 text-green-800 mt-2">Completed</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Configure Rules</h3>
                  <p className="text-sm text-muted-foreground">Set pricing parameters</p>
                  <Badge className="bg-blue-100 text-blue-800 mt-2">In Progress</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                  <AlertCircle className="w-10 h-10 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Test Integration</h3>
                  <p className="text-sm text-muted-foreground">Run test price updates</p>
                  <Badge className="bg-gray-100 text-gray-800 mt-2">Pending</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Configuration Tabs - Advanced */}
        <Tabs defaultValue="pricing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
            <TabsTrigger value="sync">Sync Status</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">Pricing Configuration</CardTitle>
                  <CardDescription>Set up your smart pricing rules and parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Peak Hours */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Peak Hours Pricing</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="peak-start">Peak Start Time</Label>
                        <Input id="peak-start" type="time" defaultValue="07:00" />
                      </div>
                      <div>
                        <Label htmlFor="peak-end">Peak End Time</Label>
                        <Input id="peak-end" type="time" defaultValue="09:00" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="lunch-peak" />
                        <Label htmlFor="lunch-peak" className="text-sm">Enable lunch peak (11:30 AM - 1:30 PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dinner-peak" />
                        <Label htmlFor="dinner-peak" className="text-sm">Enable dinner peak (6:00 PM - 8:00 PM)</Label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold mb-4">Price Adjustment Rules</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="max-increase">Maximum Price Increase</Label>
                        <Input id="max-increase" type="number" placeholder="25" />
                        <p className="text-xs text-muted-foreground mt-1">Percentage (%)</p>
                      </div>
                      <div>
                        <Label htmlFor="max-decrease">Maximum Price Decrease</Label>
                        <Input id="max-decrease" type="number" placeholder="15" />
                        <p className="text-xs text-muted-foreground mt-1">Percentage (%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold mb-4">Inventory-Based Pricing</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="low-stock" />
                        <Label htmlFor="low-stock" className="text-sm">Increase prices when inventory is low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="high-stock" />
                        <Label htmlFor="high-stock" className="text-sm">Decrease prices when inventory is high</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="expiring" />
                        <Label htmlFor="expiring" className="text-sm">Apply discounts for items near expiration</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button size="lg">
                      Save Configuration
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* API Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">API Information</CardTitle>
                  <CardDescription>Your POS system integration details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>API Endpoint</Label>
                      <Input value="https://api.pos-system.com/v1/" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Authentication</Label>
                      <Input value="OAuth 2.0" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Sync</Label>
                      <Input value="2024-01-15 14:32:15" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Connected</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold mb-4">Sync Status</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Menu Items</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">47 synced</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price Updates</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">23 pending</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Inventory Levels</span>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600">Syncing...</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Order Data</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Up to date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Sync Performance</CardTitle>
                  <CardDescription>Real-time sync metrics and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sync Speed</span>
                      <Badge className="bg-green-100 text-green-800">0.3s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <Badge className="bg-green-100 text-green-800">99.8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Points/Hour</span>
                      <Badge className="bg-blue-100 text-blue-800">10,247</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Error</span>
                      <Badge className="bg-gray-100 text-gray-800">None</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
                  <CardDescription>Latest sync events and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Menu items synced successfully</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Price updates queued</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Inventory levels updated</p>
                        <p className="text-xs text-muted-foreground">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Test Integration</CardTitle>
                  <CardDescription>Run tests to verify your integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button className="w-full" size="lg">
                      <Zap className="w-4 h-4 mr-2" />
                      Run Full Test Suite
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Test Price Update
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Activity className="w-4 h-4 mr-2" />
                      Test Data Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Test Results</CardTitle>
                  <CardDescription>Latest test results and diagnostics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Connection Test</span>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Authentication</span>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Sync</span>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Price Updates</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Advanced Settings</CardTitle>
                  <CardDescription>Configure advanced integration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Sync Frequency</Label>
                      <Input value="Real-time" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Retry Attempts</Label>
                      <Input value="3" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Timeout (seconds)</Label>
                      <Input value="30" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Log Level</Label>
                      <Input value="Info" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Security & Compliance</CardTitle>
                  <CardDescription>Security settings and compliance information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Encryption</span>
                      <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SSL/TLS</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Retention</span>
                      <Badge className="bg-blue-100 text-blue-800">90 days</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit Logging</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions - Modern */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <Zap className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Test Integration</h3>
              <p className="text-sm text-muted-foreground">Run a test price update</p>
              <Button className="w-full">
                Run Test
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <Download className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Export Data</h3>
              <p className="text-sm text-muted-foreground">Download integration logs</p>
              <Button variant="outline" className="w-full">
                Export Logs
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <Settings className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">Advanced Settings</h3>
              <p className="text-sm text-muted-foreground">Configure advanced options</p>
              <Button variant="outline" className="w-full">
                Open Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <ExternalLink className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-lg">POS Dashboard</h3>
              <p className="text-sm text-muted-foreground">Open POS Back Office</p>
              <Button variant="outline" className="w-full">
                Open POS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

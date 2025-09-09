"use client"

import { useState } from "react";
import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Progress } from "@/app/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Coffee, 
  Link2,
  RefreshCw,
  Download,
  Upload,
  TestTube,
  Shield,
  Clock
} from "lucide-react";

export default function ToastIntegration() {
  const [isConnected, setIsConnected] = useState(true);
  const [syncStatus, setSyncStatus] = useState("synced");
  const [apiKey, setApiKey] = useState("toast_sk_1234567890abcdef");
  const [lastSync, setLastSync] = useState("2 minutes ago");

  const syncProgress = 85;
  const productsSynced = 47;
  const totalProducts = 55;

  return (
    <MainLayout>
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Toast POS Integration</h2>
          <p className="text-muted-foreground">Connect and sync your Toast POS system with SmartPricing</p>
        </div>

        {/* Connection Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
              {isConnected ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isConnected ? "Connected" : "Disconnected"}
              </div>
              <div className="flex items-center text-xs">
                {isConnected ? (
                  <span className="text-green-600">All systems operational</span>
                ) : (
                  <span className="text-red-600">Connection failed</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {syncStatus === "synced" ? "Synced" : "Syncing..."}
              </div>
              <div className="text-xs text-muted-foreground">
                Last sync: {lastSync}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Synced</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productsSynced}/{totalProducts}</div>
              <div className="text-xs text-muted-foreground">
                {((productsSynced / totalProducts) * 100).toFixed(0)}% complete
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="sync">Sync Status</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Connection Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Overview</CardTitle>
                <CardDescription>Current status of your Toast POS integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Connection Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">API Key</span>
                        <Badge variant="outline">{apiKey.slice(0, 12)}...</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Environment</span>
                        <Badge variant="secondary">Production</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Last Sync</span>
                        <span className="text-sm">{lastSync}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Sync Progress</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Products</span>
                        <span className="text-sm font-medium">{productsSynced}/{totalProducts}</span>
                      </div>
                      <Progress value={syncProgress} className="w-full" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Categories</span>
                        <span className="text-sm font-medium">8/8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pricing Rules</span>
                        <span className="text-sm font-medium">12/12</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your connection is secure and encrypted. All data is transmitted using industry-standard SSL/TLS encryption.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest sync activities and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Products synced successfully</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                  <Badge variant="secondary">47 items</Badge>
                </div>
                
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pricing rules updated</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                  <Badge variant="secondary">3 rules</Badge>
                </div>
                
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">8 products failed to sync</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                  <Badge variant="outline">Retry needed</Badge>
                </div>
                
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Connection established</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <Badge variant="secondary">Success</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Toast POS Setup</CardTitle>
                <CardDescription>Configure your Toast POS integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">Toast API Key</Label>
                    <Input 
                      id="api-key" 
                      type="password" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Toast API key"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      You can find your API key in the Toast Back Office under Settings &gt; Integrations
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="environment">Environment</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="production">Production</option>
                      <option value="sandbox">Sandbox (Testing)</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-sync" defaultChecked />
                    <Label htmlFor="auto-sync">Enable automatic syncing</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="price-updates" defaultChecked />
                    <Label htmlFor="price-updates">Allow price updates to Toast</Label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button>
                    <Link2 className="h-4 w-4 mr-2" />
                    Connect to Toast
                  </Button>
                  <Button variant="outline">
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Status</CardTitle>
                <CardDescription>Monitor and manage data synchronization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} className="w-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Coffee className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Products</span>
                    </div>
                    <div className="text-2xl font-bold">{productsSynced}/{totalProducts}</div>
                    <div className="text-xs text-muted-foreground">85% complete</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Categories</span>
                    </div>
                    <div className="text-2xl font-bold">8/8</div>
                    <div className="text-xs text-muted-foreground">100% complete</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Pricing Rules</span>
                    </div>
                    <div className="text-2xl font-bold">12/12</div>
                    <div className="text-xs text-muted-foreground">100% complete</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure advanced integration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sync-frequency">Sync Frequency</Label>
                      <p className="text-xs text-muted-foreground">How often to sync with Toast</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option value="realtime">Real-time</option>
                      <option value="5min">Every 5 minutes</option>
                      <option value="15min">Every 15 minutes</option>
                      <option value="hourly">Hourly</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="price-update-delay">Price Update Delay</Label>
                      <p className="text-xs text-muted-foreground">Delay before applying price changes</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option value="immediate">Immediate</option>
                      <option value="5min">5 minutes</option>
                      <option value="15min">15 minutes</option>
                      <option value="manual">Manual approval</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" defaultChecked />
                    <div>
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Get notified of sync issues</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="backup" defaultChecked />
                    <div>
                      <Label htmlFor="backup">Automatic Backup</Label>
                      <p className="text-xs text-muted-foreground">Backup data before major changes</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Danger Zone</h4>
                  <div className="space-y-2">
                    <Button variant="destructive" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Disconnect from Toast
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      This will stop all syncing and remove the connection to Toast POS.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

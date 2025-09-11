"use client"

import { useState } from "react";
import { MainLayout } from "@/app/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { PeakHourSettingsDialog } from "@/app/components/peak-hour-settings-dialog";
import { PeakHourSettings, DAYS_OF_WEEK } from "@/lib/types/peak-hours";
import { 
  Link2, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Activity,
  Zap,
  Clock,
  Package,
  DollarSign,
  Smartphone,
  Monitor,
  Wifi,
  Shield,
  Edit3
} from "lucide-react";

export default function POSIntegration() {
  const [peakHourDialogOpen, setPeakHourDialogOpen] = useState(false);
  const [peakHourSettings, setPeakHourSettings] = useState<PeakHourSettings>({
    days: DAYS_OF_WEEK.map((day, index) => ({
      day,
      enabled: index < 5, // Enable Monday-Friday by default
      peakHours: index < 5 ? [
        {
          id: `morning-${day.toLowerCase()}`,
          startTime: "07:00",
          endTime: "09:00",
          multiplier: 1.15,
          label: "Morning Rush"
        },
        {
          id: `lunch-${day.toLowerCase()}`,
          startTime: "12:00",
          endTime: "14:00",
          multiplier: 1.20,
          label: "Lunch Rush"
        },
        {
          id: `evening-${day.toLowerCase()}`,
          startTime: "17:00",
          endTime: "19:00",
          multiplier: 1.25,
          label: "Evening Rush"
        }
      ] : []
    })),
    globalMultiplier: 1.15
  });

  const handleSavePeakHourSettings = (settings: PeakHourSettings) => {
    setPeakHourSettings(settings);
    // Here you would typically save to your backend/state management
    console.log('Peak hour settings saved:', settings);
  };

  const getPeakHoursSummary = (): string => {
    const enabledDays = peakHourSettings.days.filter(day => day.enabled);
    if (enabledDays.length === 0) return "No peak hours configured";
    
    const totalPeakHours = enabledDays.reduce((total, day) => total + day.peakHours.length, 0);
    return `${totalPeakHours} peak hours across ${enabledDays.length} days`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">POS Integration</h1>
            <p className="text-muted-foreground">
              Connect your POS system to enable smart pricing and inventory tracking
            </p>
            <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded-md">
              <p className="text-sm text-green-800">
                ✨ <strong>NEW:</strong> Advanced Peak Hour Settings - Configure multiple peak hours per day!
              </p>
            </div>
          </div>
          <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>
            <CheckCircle className="w-4 h-4 mr-1" />
            Connected
          </Badge>
        </div>

        {/* Connection Status */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#e6eaf7' }}>
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">POS System Connected</h3>
                  <p className="text-black">Toast POS - Live sync active</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2c4170' }}></div>
                      <span className="text-sm text-black">Real-time sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-black" />
                      <span className="text-sm text-black">47 products synced</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="connection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 relative">
            <TabsTrigger value="connection" className="relative z-10 transition-all duration-300 ease-in-out">Connection</TabsTrigger>
            <TabsTrigger value="pricing" className="relative z-10 transition-all duration-300 ease-in-out">Smart Pricing</TabsTrigger>
            <TabsTrigger value="inventory" className="relative z-10 transition-all duration-300 ease-in-out">Inventory Sync</TabsTrigger>
            <TabsTrigger value="settings" className="relative z-10 transition-all duration-300 ease-in-out">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="connection" className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Supported POS Systems */}
            <Card>
              <CardHeader>
                <CardTitle>Supported POS Systems</CardTitle>
                <CardDescription>
                  Connect with popular POS systems for seamless integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e6eaf7' }}>
                        <span className="text-black font-bold text-lg">T</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Toast</h3>
                        <p className="text-sm text-muted-foreground">Restaurant POS</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>Connected</Badge>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e6eaf7' }}>
                        <span className="text-black font-bold text-lg">S</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Square</h3>
                        <p className="text-sm text-muted-foreground">Point of Sale</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>Available</Badge>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e6eaf7' }}>
                        <span className="text-black font-bold text-lg">C</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Clover</h3>
                        <p className="text-sm text-muted-foreground">POS System</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="text-black" style={{ backgroundColor: '#e6eaf7' }}>Available</Badge>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Details */}
            <Card>
              <CardHeader>
                <CardTitle>Connection Details</CardTitle>
                <CardDescription>
                  Current connection status and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>POS System</Label>
                    <Input value="Toast POS" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Location ID</Label>
                    <Input value="LOC_12345" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Sync</Label>
                    <Input value="2 minutes ago" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Sync Status</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2c4170' }}></div>
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Smart Pricing Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-black" />
                  <span>Smart Pricing Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure how smart pricing works with your POS system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">Peak Hour Pricing</h4>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        console.log('Opening peak hour dialog');
                        setPeakHourDialogOpen(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Configure Peak Hours
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Global Peak Hour Multiplier</Label>
                      <Input 
                        type="number" 
                        value={peakHourSettings.globalMultiplier}
                        onChange={(e) => setPeakHourSettings({
                          ...peakHourSettings,
                          globalMultiplier: parseFloat(e.target.value) || 1.0
                        })}
                        step="0.01"
                        min="1.0"
                        max="3.0"
                      />
                      <p className="text-xs text-muted-foreground">
                        Default multiplier for all peak hours (e.g., 1.15 = 15% increase)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Current Configuration</Label>
                      <div className="p-3 border rounded-md bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Peak Hours Summary</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getPeakHoursSummary()}
                        </p>
                        {peakHourSettings.days.some(day => day.enabled && day.peakHours.length > 0) && (
                          <div className="mt-2 space-y-1">
                            {peakHourSettings.days
                              .filter(day => day.enabled && day.peakHours.length > 0)
                              .map(day => (
                                <div key={day.day} className="text-xs text-muted-foreground">
                                  <span className="font-medium">{day.day}:</span> {day.peakHours.length} peak hour{day.peakHours.length !== 1 ? 's' : ''}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Waste Prevention Pricing</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="waste-prevention" defaultChecked />
                      <Label htmlFor="waste-prevention">Enable waste prevention pricing</Label>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Low Stock Threshold</Label>
                        <Input type="number" placeholder="20" />
                        <p className="text-xs text-muted-foreground">Percentage of normal stock</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Price Reduction</Label>
                        <Input type="number" placeholder="15" />
                        <p className="text-xs text-muted-foreground">Percentage reduction</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Price Update Frequency</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="real-time" defaultChecked />
                      <Label htmlFor="real-time">Real-time price updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hourly" />
                      <Label htmlFor="hourly">Update every hour</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Inventory Sync Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-black" />
                  <span>Inventory Sync Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure how inventory is tracked and synced with your POS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Auto Inventory Tracking</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-track" defaultChecked />
                      <Label htmlFor="auto-track">Automatically track ingredient usage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-reorder" defaultChecked />
                      <Label htmlFor="auto-reorder">Enable automatic reorder suggestions</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Sync Settings</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Sync Frequency</Label>
                      <Input value="Real-time" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Products Synced</Label>
                      <Input value="47 products" disabled />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Inventory Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="low-stock-alerts" defaultChecked />
                      <Label htmlFor="low-stock-alerts">Low stock alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reorder-alerts" defaultChecked />
                      <Label htmlFor="reorder-alerts">Reorder suggestions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="waste-alerts" defaultChecked />
                      <Label htmlFor="waste-alerts">Waste prevention alerts</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general POS integration settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">API Configuration</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <Input type="password" placeholder="••••••••••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label>API Secret</Label>
                      <Input type="password" placeholder="••••••••••••••••" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Security</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="encrypt-data" defaultChecked />
                      <Label htmlFor="encrypt-data">Encrypt data transmission</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="secure-connection" defaultChecked />
                      <Label htmlFor="secure-connection">Use secure connection (HTTPS)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">Email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="push-notifications" defaultChecked />
                      <Label htmlFor="push-notifications">Push notifications</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Manage your POS integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    View Logs
                  </Button>
                  <Button variant="destructive">
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Peak Hour Settings Dialog */}
        <PeakHourSettingsDialog
          open={peakHourDialogOpen}
          onOpenChange={setPeakHourDialogOpen}
          onSave={handleSavePeakHourSettings}
          initialSettings={peakHourSettings}
        />
      </div>
    </MainLayout>
  );
}

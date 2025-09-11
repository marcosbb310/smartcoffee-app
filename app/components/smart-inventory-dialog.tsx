"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  SmartInventorySettings
} from "@/lib/types/inventory";
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  Settings,
  Bell
} from "lucide-react";

interface SmartInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (settings: SmartInventorySettings) => void;
  initialSettings: SmartInventorySettings;
}

export const SmartInventoryDialog = ({
  open,
  onOpenChange,
  onSave,
  initialSettings
}: SmartInventoryDialogProps) => {
  const [settings, setSettings] = useState<SmartInventorySettings>(initialSettings);

  const handleSave = () => {
    onSave(settings);
    onOpenChange(false);
  };

  const handleSettingChange = (field: keyof SmartInventorySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAlertSettingChange = (field: keyof SmartInventorySettings['alertSettings'], value: any) => {
    setSettings(prev => ({
      ...prev,
      alertSettings: {
        ...prev.alertSettings,
        [field]: value
      }
    }));
  };

  // Mock data for demonstration
  const mockIngredients = 6;
  const mockAlerts = 2;
  const mockAutoOrders = 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Smart Inventory Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Smart Inventory Settings
                </CardTitle>
                <CardDescription>
                  Configure automatic inventory management features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="smart-inventory">Enable Smart Inventory</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically track inventory and manage stock levels
                    </p>
                  </div>
                  <Switch
                    id="smart-inventory"
                    checked={settings.enabled}
                    onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-ordering">Auto Ordering</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically place orders when stock runs low
                    </p>
                  </div>
                  <Switch
                    id="auto-ordering"
                    checked={settings.autoOrdering}
                    onCheckedChange={(checked) => handleSettingChange('autoOrdering', checked)}
                    disabled={!settings.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="expiry-pricing">Expiry Pricing</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically reduce prices for expiring products
                    </p>
                  </div>
                  <Switch
                    id="expiry-pricing"
                    checked={settings.expiryPricing}
                    onCheckedChange={(checked) => handleSettingChange('expiryPricing', checked)}
                    disabled={!settings.enabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Alert Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Alert Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="low-stock-threshold">Low Stock Threshold (%)</Label>
                    <Input
                      id="low-stock-threshold"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.alertSettings.lowStockThreshold}
                      onChange={(e) => handleAlertSettingChange('lowStockThreshold', parseInt(e.target.value) || 20)}
                      disabled={!settings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-warning">Expiry Warning (days)</Label>
                    <Input
                      id="expiry-warning"
                      type="number"
                      min="1"
                      max="30"
                      value={settings.alertSettings.expiryWarningDays}
                      onChange={(e) => handleAlertSettingChange('expiryWarningDays', parseInt(e.target.value) || 3)}
                      disabled={!settings.enabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Total Ingredients</p>
                      <p className="text-2xl font-bold">{mockIngredients.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">Active Alerts</p>
                      <p className="text-2xl font-bold">{mockAlerts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Pending Orders</p>
                      <p className="text-2xl font-bold">{mockAutoOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Total Ingredients</p>
                    <p className="text-2xl font-bold">{mockIngredients}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Active Alerts</p>
                    <p className="text-2xl font-bold">{mockAlerts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Pending Orders</p>
                    <p className="text-2xl font-bold">{mockAutoOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

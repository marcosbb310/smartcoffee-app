"use client"

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Plus, Trash2, Clock, Zap, Settings, DollarSign, HelpCircle, ChevronDown } from "lucide-react";
import { PeakHour, DayPeakHours, PeakHourSettings, DAYS_OF_WEEK } from "@/lib/types/peak-hours";

interface GlobalSmartPricingSettings {
  enabled: boolean;
  globalPeakHours: PeakHourSettings;
  priceParameters: {
    minPricePercentage: number; // e.g., 50 = 50% of base price
    maxPricePercentage: number; // e.g., 150 = 150% of peak price
    defaultMultiplier: number; // e.g., 1.15 = 15% increase
    pricingStrategy: 'multiplier' | 'range'; // 'multiplier' = use multiplier, 'range' = use min/max range
  };
}

interface GlobalSmartPricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (settings: GlobalSmartPricingSettings) => void;
  initialSettings?: GlobalSmartPricingSettings;
}

const generatePeakHourId = (): string => {
  return `peak-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const defaultPeakHour: PeakHour = {
  id: generatePeakHourId(),
  startTime: "07:00",
  endTime: "09:00",
  multiplier: 1.15,
  label: "Morning Rush"
};

const defaultSettings: GlobalSmartPricingSettings = {
  enabled: false,
  globalPeakHours: {
    days: DAYS_OF_WEEK.map(day => ({
      day,
      enabled: false,
      peakHours: []
    })),
    globalMultiplier: 1.15
  },
  priceParameters: {
    minPricePercentage: 50, // 50% of base price
    maxPricePercentage: 150, // 150% of peak price
    defaultMultiplier: 1.15, // 15% increase
    pricingStrategy: 'multiplier' as const // Use multiplier approach
  }
};

export const GlobalSmartPricingDialog = ({ 
  open, 
  onOpenChange, 
  onSave, 
  initialSettings = defaultSettings 
}: GlobalSmartPricingDialogProps) => {
  const [settings, setSettings] = useState<GlobalSmartPricingSettings>(initialSettings);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (open) {
      setSettings(initialSettings);
    }
  }, [open, initialSettings]);

  const handleDayToggle = (dayIndex: number, enabled: boolean) => {
    const updatedDays = [...settings.globalPeakHours.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      enabled,
      peakHours: enabled ? updatedDays[dayIndex].peakHours : []
    };
    setSettings({
      ...settings,
      globalPeakHours: { ...settings.globalPeakHours, days: updatedDays }
    });
  };

  const handleAddPeakHour = (dayIndex: number) => {
    const updatedDays = [...settings.globalPeakHours.days];
    const newPeakHour = { ...defaultPeakHour, id: generatePeakHourId() };
    updatedDays[dayIndex].peakHours.push(newPeakHour);
    setSettings({
      ...settings,
      globalPeakHours: { ...settings.globalPeakHours, days: updatedDays }
    });
  };

  const handleRemovePeakHour = (dayIndex: number, peakHourId: string) => {
    const updatedDays = [...settings.globalPeakHours.days];
    updatedDays[dayIndex].peakHours = updatedDays[dayIndex].peakHours.filter(
      ph => ph.id !== peakHourId
    );
    setSettings({
      ...settings,
      globalPeakHours: { ...settings.globalPeakHours, days: updatedDays }
    });
  };

  const handlePeakHourChange = (
    dayIndex: number, 
    peakHourId: string, 
    field: keyof PeakHour, 
    value: string | number
  ) => {
    const updatedDays = [...settings.globalPeakHours.days];
    const peakHourIndex = updatedDays[dayIndex].peakHours.findIndex(ph => ph.id === peakHourId);
    
    if (peakHourIndex !== -1) {
      updatedDays[dayIndex].peakHours[peakHourIndex] = {
        ...updatedDays[dayIndex].peakHours[peakHourIndex],
        [field]: value
      };
      setSettings({
        ...settings,
        globalPeakHours: { ...settings.globalPeakHours, days: updatedDays }
      });
    }
  };

  const handlePriceParameterChange = (field: keyof GlobalSmartPricingSettings['priceParameters'], value: number) => {
    setSettings({
      ...settings,
      priceParameters: {
        ...settings.priceParameters,
        [field]: value
      }
    });
  };

  const handleDayPriceChange = (dayIndex: number, field: keyof DayPeakHours, value: any) => {
    const updatedDays = [...settings.globalPeakHours.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [field]: value
    };
    setSettings({
      ...settings,
      globalPeakHours: { ...settings.globalPeakHours, days: updatedDays }
    });
  };

  const handleSave = () => {
    onSave(settings);
    onOpenChange(false);
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTotalPeakHours = (): number => {
    return settings.globalPeakHours.days.reduce((total, day) => total + day.peakHours.length, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Global Smart Pricing Settings
              </DialogTitle>
              <DialogDescription>
                Configure smart pricing parameters that apply to all products
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              <ChevronDown className={`h-3 w-3 transition-transform ${showHelp ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {/* Collapsible Help Section */}
          {showHelp && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">How Smart Pricing Works:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>1. <strong>Base Price:</strong> Normal product price (e.g., $4.00)</p>
                <p>2. <strong>Peak Multiplier:</strong> Applied during peak hours (e.g., 1.15x = $4.60)</p>
                <p>3. <strong>Min/Max Constraints:</strong> Final price is capped between min and max limits</p>
                <p className="font-medium">Result: Peak price is calculated, then constrained by your safety limits</p>
              </div>
              <div className="mt-3 p-3 bg-white border border-blue-300 rounded">
                <h5 className="font-medium text-blue-900 mb-2">Example:</h5>
                <div className="text-sm text-blue-800">
                  <p>Product: Espresso (Base: $3.25, Peak: $3.75)</p>
                  <p>Settings: 50% min, 150% max, 1.15x multiplier</p>
                  <p>Calculation: $3.25 × 1.15 = $3.74</p>
                  <p>Constraints: Min $1.63, Max $5.63</p>
                  <p className="font-medium">Final Peak Price: $3.74 ✅</p>
                </div>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">

          {/* Global Peak Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Global Peak Hours
              </CardTitle>
              <CardDescription>
                Configure peak hours that apply to all products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settings.globalPeakHours.days.map((dayData, dayIndex) => (
                  <div key={dayData.day} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`global-day-${dayIndex}`}
                          checked={dayData.enabled}
                          onCheckedChange={(checked) => 
                            handleDayToggle(dayIndex, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`global-day-${dayIndex}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {dayData.day}
                        </Label>
                      </div>
                      {dayData.enabled && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddPeakHour(dayIndex)}
                          className="h-7 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>

                  {dayData.enabled && (
                    <div className="space-y-3">
                      {/* Day-specific Peak Hour Multiplier */}
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="text-sm font-medium mb-2">Peak Hour Settings for {dayData.day}</h5>
                        <div className="flex items-center gap-2">
                          <Label className="text-xs">Default Multiplier:</Label>
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              step="0.01"
                              min="1.0"
                              max="3.0"
                              value={dayData.defaultMultiplier || 1.15}
                              onChange={(e) => 
                                handleDayPriceChange(dayIndex, 'defaultMultiplier', parseFloat(e.target.value) || 1.15)
                              }
                              className="text-xs h-7 w-20"
                            />
                            <span className="text-xs text-muted-foreground">x</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Applied to all peak hours for this day
                          </p>
                        </div>
                      </div>

                      {/* Peak Hours */}
                      {dayData.peakHours.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-2">
                          No peak hours configured
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {dayData.peakHours.map((peakHour, peakIndex) => (
                            <div key={peakHour.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                              <div className="flex-1 grid grid-cols-4 gap-2">
                                <Input
                                  value={peakHour.label || ''}
                                  onChange={(e) => 
                                    handlePeakHourChange(dayIndex, peakHour.id, 'label', e.target.value)
                                  }
                                  placeholder="Label"
                                  className="text-xs h-8"
                                />
                                <Input
                                  type="time"
                                  value={peakHour.startTime}
                                  onChange={(e) => 
                                    handlePeakHourChange(dayIndex, peakHour.id, 'startTime', e.target.value)
                                  }
                                  className="text-xs h-8"
                                />
                                <Input
                                  type="time"
                                  value={peakHour.endTime}
                                  onChange={(e) => 
                                    handlePeakHourChange(dayIndex, peakHour.id, 'endTime', e.target.value)
                                  }
                                  className="text-xs h-8"
                                />
                                <div className="flex gap-1">
                                  <Input
                                    type="number"
                                    step="0.01"
                                    min="1.0"
                                    max="3.0"
                                    value={peakHour.multiplier}
                                    onChange={(e) => 
                                      handlePeakHourChange(dayIndex, peakHour.id, 'multiplier', parseFloat(e.target.value) || 1.0)
                                    }
                                    className="text-xs h-8 flex-1"
                                    placeholder="1.15"
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRemovePeakHour(dayIndex, peakHour.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Total Peak Hours: {getTotalPeakHours()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Days Configured: {settings.globalPeakHours.days.filter(day => day.enabled).length}/7
                </span>
              </div>
            </div>
            <Badge variant={settings.enabled ? "default" : "secondary"} className="text-xs">
              {settings.enabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Global Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

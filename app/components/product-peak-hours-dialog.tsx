"use client"

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Plus, Trash2, Clock, Zap } from "lucide-react";
import { PeakHour, DayPeakHours, PeakHourSettings, DAYS_OF_WEEK } from "@/lib/types/peak-hours";

interface ProductPeakHoursDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (settings: PeakHourSettings) => void;
  productName: string;
  productBasePrice: number;
  productPeakPrice: number;
  initialSettings?: PeakHourSettings;
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

const defaultSettings: PeakHourSettings = {
  days: DAYS_OF_WEEK.map(day => ({
    day,
    enabled: false,
    peakHours: []
  })),
  globalMultiplier: 1.15
};

export const ProductPeakHoursDialog = ({ 
  open, 
  onOpenChange, 
  onSave, 
  productName,
  productBasePrice,
  productPeakPrice,
  initialSettings = defaultSettings 
}: ProductPeakHoursDialogProps) => {
  const [settings, setSettings] = useState<PeakHourSettings>(initialSettings);

  useEffect(() => {
    if (open) {
      setSettings(initialSettings);
    }
  }, [open, initialSettings]);

  const handleDayToggle = (dayIndex: number, enabled: boolean) => {
    const updatedDays = [...settings.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      enabled,
      peakHours: enabled ? updatedDays[dayIndex].peakHours : []
    };
    setSettings({ ...settings, days: updatedDays });
  };

  const handleAddPeakHour = (dayIndex: number) => {
    const updatedDays = [...settings.days];
    const newPeakHour = { ...defaultPeakHour, id: generatePeakHourId() };
    updatedDays[dayIndex].peakHours.push(newPeakHour);
    setSettings({ ...settings, days: updatedDays });
  };

  const handleRemovePeakHour = (dayIndex: number, peakHourId: string) => {
    const updatedDays = [...settings.days];
    updatedDays[dayIndex].peakHours = updatedDays[dayIndex].peakHours.filter(
      ph => ph.id !== peakHourId
    );
    setSettings({ ...settings, days: updatedDays });
  };

  const handlePeakHourChange = (
    dayIndex: number, 
    peakHourId: string, 
    field: keyof PeakHour, 
    value: string | number
  ) => {
    const updatedDays = [...settings.days];
    const peakHourIndex = updatedDays[dayIndex].peakHours.findIndex(ph => ph.id === peakHourId);
    
    if (peakHourIndex !== -1) {
      let processedValue = value;
      
      // Convert percentage to decimal multiplier for multiplier field
      if (field === 'multiplier') {
        const percentage = parseFloat(value as string) || 0;
        processedValue = 1 + (percentage / 100);
      }
      
      updatedDays[dayIndex].peakHours[peakHourIndex] = {
        ...updatedDays[dayIndex].peakHours[peakHourIndex],
        [field]: processedValue
      };
      setSettings({ ...settings, days: updatedDays });
    }
  };

  const handlePeakHourPriceChange = (
    dayIndex: number, 
    peakHourId: string, 
    price: string
  ) => {
    const updatedDays = [...settings.days];
    const peakHourIndex = updatedDays[dayIndex].peakHours.findIndex(ph => ph.id === peakHourId);
    
    if (peakHourIndex !== -1) {
      const priceValue = parseFloat(price) || productBasePrice;
      const percentage = getPercentageFromPrice(priceValue);
      const multiplier = 1 + (percentage / 100);
      
      updatedDays[dayIndex].peakHours[peakHourIndex] = {
        ...updatedDays[dayIndex].peakHours[peakHourIndex],
        multiplier
      };
      setSettings({ ...settings, days: updatedDays });
    }
  };

  const handleDayPriceChange = (dayIndex: number, field: 'minPrice' | 'maxPrice', value: number) => {
    const updatedDays = [...settings.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [field]: value
    };
    setSettings({ ...settings, days: updatedDays });
  };

  const handleGlobalMultiplierChange = (value: string) => {
    // Convert percentage to decimal multiplier (e.g., 15% -> 1.15)
    const percentage = parseFloat(value) || 0;
    const multiplier = 1 + (percentage / 100);
    setSettings({ ...settings, globalMultiplier: multiplier });
  };

  const handleGlobalPriceChange = (value: string) => {
    // Convert price to percentage and then to multiplier
    const price = parseFloat(value) || productBasePrice;
    const percentage = getPercentageFromPrice(price);
    const multiplier = 1 + (percentage / 100);
    setSettings({ ...settings, globalMultiplier: multiplier });
  };

  // Convert decimal multiplier to percentage for display
  const getPercentageFromMultiplier = (multiplier: number): number => {
    return Math.round((multiplier - 1) * 100);
  };

  // Convert price to percentage based on base price
  const getPercentageFromPrice = (price: number): number => {
    if (productBasePrice === 0) return 0;
    const multiplier = price / productBasePrice;
    return Math.round((multiplier - 1) * 100);
  };

  // Convert percentage to price based on base price
  const getPriceFromPercentage = (percentage: number): number => {
    const multiplier = 1 + (percentage / 100);
    return productBasePrice * multiplier;
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
    return settings.days.reduce((total, day) => total + day.peakHours.length, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Peak Hour Settings - {productName}
          </DialogTitle>
          <DialogDescription>
            Configure peak hours for this product to optimize pricing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Base Price */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-blue-900">Product Base Price</h4>
                <p className="text-xs text-blue-700">Current base price for {productName}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-900">${productBasePrice.toFixed(2)}</span>
                <p className="text-xs text-blue-700">Base Price</p>
              </div>
            </div>
          </div>

          {/* Global Multiplier */}
          <div className="space-y-2">
            <Label htmlFor="global-multiplier">Default Peak Hour Price Increase (%)</Label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Input
                  id="global-multiplier"
                  type="number"
                  step="1"
                  min="0"
                  max="200"
                  value={getPercentageFromMultiplier(settings.globalMultiplier)}
                  onChange={(e) => handleGlobalMultiplierChange(e.target.value)}
                  placeholder="15"
                  className="pr-10"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200 flex-1">
                <span className="text-sm text-green-700 whitespace-nowrap">New Price:</span>
                <Input
                  type="text"
                  value={(productBasePrice * settings.globalMultiplier).toFixed(2)}
                  onChange={(e) => handleGlobalPriceChange(e.target.value)}
                  className="text-lg font-bold text-green-900 bg-transparent border-none p-0 h-auto w-full focus:ring-0 focus:border-none"
                  style={{ color: '#14532d' }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Default percentage increase for all peak hours
            </p>
          </div>

          {/* Days of Week with Compact Peak Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-black">Peak Hours by Day</h4>
            <div className="space-y-2">
              {settings.days.map((dayData, dayIndex) => (
                <div key={dayData.day} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`day-${dayIndex}`}
                        checked={dayData.enabled}
                        onCheckedChange={(checked) => 
                          handleDayToggle(dayIndex, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`day-${dayIndex}`}
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

                      {/* Peak hours */}
                      {dayData.peakHours.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-2">
                          No peak hours configured
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {dayData.peakHours.map((peakHour, peakIndex) => (
                            <div key={peakHour.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded">
                              <div className="flex-1 grid grid-cols-4 gap-3">
                                <div className="flex flex-col">
                                  <label className="text-xs text-muted-foreground mb-1">Start</label>
                                  <Input
                                    type="time"
                                    value={peakHour.startTime}
                                    onChange={(e) => 
                                      handlePeakHourChange(dayIndex, peakHour.id, 'startTime', e.target.value)
                                    }
                                    className="text-xs h-8"
                                    title="Start Time"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs text-muted-foreground mb-1">End</label>
                                  <Input
                                    type="time"
                                    value={peakHour.endTime}
                                    onChange={(e) => 
                                      handlePeakHourChange(dayIndex, peakHour.id, 'endTime', e.target.value)
                                    }
                                    className="text-xs h-8"
                                    title="End Time"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs text-muted-foreground mb-1">Increase %</label>
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      step="1"
                                      min="0"
                                      max="200"
                                      value={getPercentageFromMultiplier(peakHour.multiplier)}
                                      onChange={(e) => 
                                        handlePeakHourChange(dayIndex, peakHour.id, 'multiplier', e.target.value)
                                      }
                                      className="text-xs h-8 pr-8"
                                      placeholder="15"
                                      title="Price Increase %"
                                    />
                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs text-muted-foreground mb-1">New Price</label>
                                  <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded border border-green-200 flex-1">
                                      <span className="text-xs text-green-700">$</span>
                                      <Input
                                        type="text"
                                        value={(productBasePrice * peakHour.multiplier).toFixed(2)}
                                        onChange={(e) => handlePeakHourPriceChange(dayIndex, peakHour.id, e.target.value)}
                                        className="text-xs text-green-700 bg-transparent border-none p-0 h-auto w-full focus:ring-0 focus:border-none"
                                        style={{ color: '#15803d' }}
                                      />
                                    </div>
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
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          {/* Summary */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Peak Hours: {getTotalPeakHours()}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {settings.days.filter(day => day.enabled).length} days enabled
            </Badge>
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

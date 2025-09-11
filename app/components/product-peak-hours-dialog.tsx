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
      updatedDays[dayIndex].peakHours[peakHourIndex] = {
        ...updatedDays[dayIndex].peakHours[peakHourIndex],
        [field]: value
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
    const multiplier = parseFloat(value) || 1.0;
    setSettings({ ...settings, globalMultiplier: multiplier });
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
          {/* Global Multiplier */}
          <div className="space-y-2">
            <Label htmlFor="global-multiplier">Default Peak Hour Multiplier</Label>
            <Input
              id="global-multiplier"
              type="number"
              step="0.01"
              min="1.0"
              max="3.0"
              value={settings.globalMultiplier}
              onChange={(e) => handleGlobalMultiplierChange(e.target.value)}
              placeholder="1.15"
            />
            <p className="text-xs text-muted-foreground">
              Default multiplier for all peak hours (e.g., 1.15 = 15% increase)
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
          </div>

          {/* Current Price Reference */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Base Price</span>
              <span className="font-medium">${productBasePrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Current Peak Price</span>
              <span className="font-medium">${productPeakPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Set individual min/max prices for each day above
            </p>
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

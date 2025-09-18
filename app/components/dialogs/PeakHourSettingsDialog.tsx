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

interface PeakHourSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (settings: PeakHourSettings) => void;
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

export const PeakHourSettingsDialog = ({ 
  open, 
  onOpenChange, 
  onSave, 
  initialSettings = defaultSettings 
}: PeakHourSettingsDialogProps) => {
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Peak Hour Settings
          </DialogTitle>
          <DialogDescription>
            Configure multiple peak hours for each day of the week to optimize pricing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Global Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Global Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                    Default multiplier applied to all peak hours (e.g., 1.15 = 15% increase)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {getTotalPeakHours()} total peak hours configured
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day-by-Day Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Daily Peak Hour Configuration</h3>
            {settings.days.map((dayData, dayIndex) => (
              <Card key={dayData.day}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`day-${dayIndex}`}
                        checked={dayData.enabled}
                        onCheckedChange={(checked) => 
                          handleDayToggle(dayIndex, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`day-${dayIndex}`}
                        className="text-lg font-semibold cursor-pointer"
                      >
                        {dayData.day}
                      </Label>
                    </div>
                    {dayData.enabled && (
                      <Button
                        size="sm"
                        onClick={() => handleAddPeakHour(dayIndex)}
                        className="h-8"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Peak Hour
                      </Button>
                    )}
                  </div>
                </CardHeader>

                {dayData.enabled && (
                  <CardContent className="pt-0">
                    {dayData.peakHours.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No peak hours configured for {dayData.day}</p>
                        <p className="text-sm">Click "Add Peak Hour" to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dayData.peakHours.map((peakHour, peakIndex) => (
                          <div key={peakHour.id}>
                            {peakIndex > 0 && <Separator className="my-4" />}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                              <div className="space-y-2">
                                <Label>Label (Optional)</Label>
                                <Input
                                  value={peakHour.label || ''}
                                  onChange={(e) => 
                                    handlePeakHourChange(dayIndex, peakHour.id, 'label', e.target.value)
                                  }
                                  placeholder="e.g., Morning Rush"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Start Time</Label>
                                <Input
                                  type="time"
                                  value={peakHour.startTime}
                                  onChange={(e) => 
                                    handlePeakHourChange(dayIndex, peakHour.id, 'startTime', e.target.value)
                                  }
                                />
                                <p className="text-xs text-muted-foreground">
                                  {formatTime(peakHour.startTime)}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label>End Time</Label>
                                <Input
                                  type="time"
                                  value={peakHour.endTime}
                                  onChange={(e) => 
                                    handlePeakHourChange(dayIndex, peakHour.id, 'endTime', e.target.value)
                                  }
                                />
                                <p className="text-xs text-muted-foreground">
                                  {formatTime(peakHour.endTime)}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label>Multiplier</Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="number"
                                    step="0.01"
                                    min="1.0"
                                    max="3.0"
                                    value={peakHour.multiplier}
                                    onChange={(e) => 
                                      handlePeakHourChange(dayIndex, peakHour.id, 'multiplier', parseFloat(e.target.value) || 1.0)
                                    }
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRemovePeakHour(dayIndex, peakHour.id)}
                                    className="px-2"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {((peakHour.multiplier - 1) * 100).toFixed(0)}% increase
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Peak Hour Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

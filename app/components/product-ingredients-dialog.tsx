"use client"

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Package, AlertTriangle, CheckCircle } from "lucide-react";
import { Ingredient, RecipeItem } from "@/lib/types/inventory";

interface ProductIngredientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productId: string;
  ingredients: Ingredient[];
  recipe: RecipeItem[];
}

export const ProductIngredientsDialog = ({ 
  open, 
  onOpenChange, 
  productName,
  productId,
  ingredients,
  recipe 
}: ProductIngredientsDialogProps) => {

  const getStockStatus = (ingredient: Ingredient) => {
    const percentage = (ingredient.currentStock / ingredient.maxStockLevel) * 100;
    if (percentage <= 10) return { status: "critical", color: "text-red-600", bgColor: "bg-red-50" };
    if (percentage <= 20) return { status: "low", color: "text-orange-600", bgColor: "bg-orange-50" };
    if (percentage <= 50) return { status: "medium", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    return { status: "good", color: "text-green-600", bgColor: "bg-green-50" };
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "low":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {productName} - Ingredients
          </DialogTitle>
          <DialogDescription>
            View the ingredients required for this product and their current stock levels
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {recipe.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Recipe Found</h3>
              <p className="text-muted-foreground">
                This product doesn't have a recipe defined yet. Add ingredients to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recipe.map((recipeItem) => {
                const ingredient = ingredients.find(ing => ing.id === recipeItem.ingredientId);
                if (!ingredient) return null;

                const stockStatus = getStockStatus(ingredient);
                const stockPercentage = (ingredient.currentStock / ingredient.maxStockLevel) * 100;
                const canMake = Math.floor(ingredient.currentStock / recipeItem.quantity);

                return (
                  <Card key={recipeItem.ingredientId} className={`${stockStatus.bgColor} border-0`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{ingredient.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Required: {recipeItem.quantity} {recipeItem.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStockStatusIcon(stockStatus.status)}
                          <Badge 
                            variant="secondary" 
                            className={`${stockStatus.color} bg-white/50 border-0`}
                          >
                            {stockStatus.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Stock Level</span>
                          <span>{ingredient.currentStock.toFixed(1)} / {ingredient.maxStockLevel.toFixed(1)} {ingredient.unit}</span>
                        </div>
                        <Progress 
                          value={Math.min(stockPercentage, 100)} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs">
                          <span className={`${stockStatus.color} font-medium`}>
                            Can make: {canMake} {productName}s
                          </span>
                          <span className="text-muted-foreground">
                            {stockPercentage.toFixed(0)}% remaining
                          </span>
                        </div>
                      </div>

                      {stockStatus.status === "critical" || stockStatus.status === "low" ? (
                        <div className="mt-3 p-2 bg-white/70 rounded text-xs">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            <span className="font-medium">Low Stock Alert</span>
                          </div>
                          <p className="text-muted-foreground mt-1">
                            Consider reordering soon to avoid stockouts
                          </p>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Summary */}
          {recipe.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Production Summary</h4>
                    <p className="text-sm text-blue-700">
                      Based on current stock levels
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-900">
                      {Math.min(...recipe.map(item => {
                        const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
                        return ingredient ? Math.floor(ingredient.currentStock / item.quantity) : 0;
                      }))}
                    </div>
                    <p className="text-sm text-blue-700">can be made</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onSave?: () => void;
  saveText?: string;
  cancelText?: string;
  maxWidth?: string;
  showFooter?: boolean;
}

export const BaseDialog = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  icon, 
  children, 
  onSave,
  saveText = "Save",
  cancelText = "Cancel",
  maxWidth = "max-w-4xl",
  showFooter = true
}: BaseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidth} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        {children}
        
        {showFooter && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {cancelText}
            </Button>
            {onSave && (
              <Button onClick={onSave}>
                {saveText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../../lib/utils";
import "./Sheet.css";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="sheet-overlay"
        onClick={() => onOpenChange?.(false)}
      />
      {children}
    </>
  );
};

const SheetContent: React.FC<SheetContentProps> = ({ 
  side = "right", 
  className, 
  children, 
  ...props 
}) => {
  const sideClass = `sheet-content-${side}`;

  return (
    <div
      className={cn("sheet-content", sideClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};

const SheetHeader: React.FC<SheetHeaderProps> = ({ className, children, ...props }) => (
  <div
    className={cn("sheet-header", className)}
    {...props}
  >
    {children}
  </div>
);

const SheetTitle: React.FC<SheetTitleProps> = ({ className, children, ...props }) => (
  <h2
    className={cn("sheet-title", className)}
    {...props}
  >
    {children}
  </h2>
);

const SheetTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const SheetClose: React.FC<{ 
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}> = ({ onClose, className, children }) => (
  <button
    onClick={onClose}
    className={cn("sheet-close", className)}
  >
    {children ? children : (
      <>
        <X className="sheet-close-icon" />
        <span className="sr-only">Close</span>
      </>
    )}
  </button>
);

export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
};
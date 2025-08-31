import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../../lib/utils";

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
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
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
  const sideClasses = {
    top: "inset-x-0 top-0 border-b slide-in-from-top",
    bottom: "inset-x-0 bottom-0 border-t slide-in-from-bottom",
    left: "inset-y-0 left-0 h-full w-3/4 border-r slide-in-from-left sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l slide-in-from-right sm:max-w-sm"
  };

  return (
    <div
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition-all duration-300 ease-in-out animate-in",
        sideClasses[side],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SheetHeader: React.FC<SheetHeaderProps> = ({ className, children, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const SheetTitle: React.FC<SheetTitleProps> = ({ className, children, ...props }) => (
  <h2
    className={cn("text-lg font-semibold text-foreground", className)}
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
}> = ({ onClose, className }) => (
  <button
    onClick={onClose}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
      className
    )}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
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
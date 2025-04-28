import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "./button";

// Context for sidebar state
interface SidebarContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(defaultOpen);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [defaultOpen]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Sidebar component
export function Sidebar({ children }: { children: React.ReactNode }) {
  const { open, isMobile } = useSidebar();

  return (
    <aside
      className={cn(
        "h-screen bg-background border-r transition-all duration-300 ease-in-out z-30",
        open ? "w-64" : "w-0",
        isMobile && open ? "fixed left-0 top-0 shadow-lg" : ""
      )}
    >
      <div className={cn("h-full flex flex-col", !open && "hidden")}>
        {children}
      </div>
    </aside>
  );
}

// Sidebar header
export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-16 border-b flex items-center px-4">
      {children}
    </div>
  );
}

// Sidebar content
export function SidebarContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-auto py-2">
      {children}
    </div>
  );
}

// Sidebar footer
export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t mt-auto">
      {children}
    </div>
  );
}

// Sidebar menu
export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return (
    <nav className="px-2 space-y-1">
      {children}
    </nav>
  );
}

// Sidebar menu item
export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

// Sidebar menu button
const menuButtonVariants = cva(
  "flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-transparent hover:text-accent-foreground",
      },
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      isActive: false,
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: "default" | "ghost";
  tooltip?: string;
  asChild?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { className, children, isActive, variant, tooltip, asChild, ...props },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "button";
    const childProps = asChild ? {} : { ref, ...props };

    const content = (
      <Comp
        className={cn(
          menuButtonVariants({ isActive, variant }),
          className
        )}
        {...childProps}
      >
        {children}
      </Comp>
    );

    return tooltip ? (
      <div className="group relative">
        {content}
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded hidden group-hover:block whitespace-nowrap">
          {tooltip}
        </div>
      </div>
    ) : (
      content
    );
  }
);

SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar inset (main content area)
export function SidebarInset({ children, className }: { children: React.ReactNode, className?: string }) {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        open ? "ml-0 md:ml-64" : "ml-0",
        className
      )}
    >
      {children}
    </div>
  );
}

// Sidebar trigger button
export function SidebarTrigger() {
  const { open, setOpen, isMobile } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(!open)}
      className="md:hidden"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}

// Sidebar toggle button
export function SidebarToggle() {
  const { open, setOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(!open)}
      className="hidden md:flex"
    >
      {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Button>
  );
}
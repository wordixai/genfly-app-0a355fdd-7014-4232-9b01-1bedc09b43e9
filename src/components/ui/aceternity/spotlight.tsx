import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function Spotlight({
  children,
  className = "",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX.current = x;
      mouseY.current = y;
      
      const spotlight = containerRef.current!.querySelector(".spotlight") as HTMLElement;
      if (spotlight) {
        spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-slate-950 w-full rounded-md",
        className
      )}
    >
      <div className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
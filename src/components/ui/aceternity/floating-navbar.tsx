import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingNavProps = {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
};

export const FloatingNav = ({
  navItems,
  className,
}: FloatingNavProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-4 inset-x-0 max-w-2xl mx-auto z-50",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center space-x-4 px-4 py-2 rounded-full",
          isScrolled
            ? "bg-white border border-neutral-200 shadow-md backdrop-blur-md"
            : "bg-white/70 border border-transparent"
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`nav-item-${idx}`}
            href={navItem.link}
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm transition-all duration-300 ease-in-out",
              activeIndex === idx ? "text-neutral-800" : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {navItem.icon && navItem.icon}
              <span>{navItem.name}</span>
            </span>
            {activeIndex === idx && (
              <motion.div
                layoutId="nav-item-highlight"
                className="absolute inset-0 bg-neutral-100 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
            )}
          </a>
        ))}
      </div>
    </motion.div>
  );
};
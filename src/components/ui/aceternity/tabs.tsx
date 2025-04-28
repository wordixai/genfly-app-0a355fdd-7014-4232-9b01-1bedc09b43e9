import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex flex-col gap-4 w-full", containerClassName)}
    >
      <div className="flex flex-row gap-2">
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm transition-all duration-300",
              active.value === tab.value
                ? cn("text-white", activeTabClassName)
                : cn(
                    "text-neutral-400 hover:text-neutral-300",
                    tabClassName
                  )
            )}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{
                  type: "spring",
                  duration: 0.6,
                }}
              />
            )}
            <span className="relative z-10">{tab.title}</span>
          </button>
        ))}
      </div>
      <div className={cn("relative", contentClassName)}>
        {tabs.map((tab, idx) => (
          <motion.div
            key={tab.value}
            initial={{ opacity: 0 }}
            animate={{
              opacity: active.value === tab.value ? 1 : 0,
              zIndex: active.value === tab.value ? 1 : 0,
            }}
            className="absolute top-0 left-0 w-full"
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
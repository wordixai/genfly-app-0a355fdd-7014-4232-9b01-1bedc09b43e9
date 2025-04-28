import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ImageHoverProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export const ImageHover = ({
  src,
  alt,
  width,
  height,
  className,
}: ImageHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-500"
      />
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      {isHovered && (
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm pointer-events-none"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
};
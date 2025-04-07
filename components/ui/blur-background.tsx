"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlurBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  opacity?: number;
  blurAmount?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  animationSpeed?: "slow" | "normal" | "fast";
  blobCount?: number;
  className?: string;
  zIndex?: number;
}

export default function BlurBackground({
  primaryColor = "bg-primary/20",
  secondaryColor = "bg-secondary/20",
  accentColor = "bg-accent/20",
  opacity = 0.7,
  blurAmount = "3xl",
  animationSpeed = "normal",
  blobCount = 5,
  className = "",
  zIndex = 0,
}: BlurBackgroundProps) {
  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case "slow":
        return 1.2;
      case "fast":
        return 0.6;
      default:
        return 0.8;
    }
  };

  const getBlurClass = (size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl") => {
    return `blur-${size}`;
  };

  return (
    <div
      className={`absolute inset-0 z-${zIndex} overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: getAnimationDuration() }}
        className="relative h-full w-full"
      >
        {/* Primary blob */}
        {blobCount >= 1 && (
          <div
            className={`animate-blob absolute -top-24 -left-20 h-72 w-72 rounded-full ${primaryColor} opacity-${Math.round(opacity * 100)} mix-blend-multiply ${getBlurClass(blurAmount)} filter`}
          />
        )}

        {/* Secondary blob */}
        {blobCount >= 2 && (
          <div
            className={`animate-blob animation-delay-2000 absolute top-1/3 -right-24 h-80 w-80 rounded-full ${secondaryColor} opacity-${Math.round(opacity * 100)} mix-blend-multiply ${getBlurClass(blurAmount)} filter`}
          />
        )}

        {/* Accent blob */}
        {blobCount >= 3 && (
          <div
            className={`animate-blob animation-delay-4000 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full ${accentColor} opacity-${Math.round(opacity * 100)} mix-blend-multiply ${getBlurClass(blurAmount)} filter`}
          />
        )}

        {/* Small primary blob */}
        {blobCount >= 4 && (
          <div
            className={`animate-blob animation-delay-3000 absolute bottom-1/3 left-1/4 h-40 w-40 rounded-full ${primaryColor} opacity-${Math.round(opacity * 50)} mix-blend-multiply ${getBlurClass(blurAmount === "3xl" ? "2xl" : blurAmount)} filter`}
          />
        )}

        {/* Small secondary blob */}
        {blobCount >= 5 && (
          <div
            className={`animate-blob animation-delay-1000 absolute top-1/4 right-1/3 h-32 w-32 rounded-full ${secondaryColor} opacity-${Math.round(opacity * 50)} mix-blend-multiply ${getBlurClass(blurAmount === "3xl" ? "xl" : blurAmount === "2xl" ? "lg" : blurAmount)} filter`}
          />
        )}
      </motion.div>
    </div>
  );
}

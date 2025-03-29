"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlurBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function BlurBackground({
  primaryColor = "bg-primary/20",
  secondaryColor = "bg-secondary/20",
  accentColor = "bg-accent/20",
}: BlurBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-full w-full"
      >
        {/* Primary blob */}
        <div
          className={`animate-blob absolute -top-24 -left-20 h-72 w-72 rounded-full ${primaryColor} opacity-70 mix-blend-multiply blur-3xl filter`}
        />

        {/* Secondary blob */}
        <div
          className={`animate-blob animation-delay-2000 absolute top-1/3 -right-24 h-80 w-80 rounded-full ${secondaryColor} opacity-70 mix-blend-multiply blur-3xl filter`}
        />

        {/* Accent blob */}
        <div
          className={`animate-blob animation-delay-4000 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full ${accentColor} opacity-70 mix-blend-multiply blur-3xl filter`}
        />

        {/* Small primary blob */}
        <div
          className={`animate-blob animation-delay-3000 absolute bottom-1/3 left-1/4 h-40 w-40 rounded-full ${primaryColor} opacity-50 mix-blend-multiply blur-2xl filter`}
        />

        {/* Small secondary blob */}
        <div
          className={`animate-blob animation-delay-1000 absolute top-1/4 right-1/3 h-32 w-32 rounded-full ${secondaryColor} opacity-50 mix-blend-multiply blur-xl filter`}
        />
      </motion.div>
    </div>
  );
}

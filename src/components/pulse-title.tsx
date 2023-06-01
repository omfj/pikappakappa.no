"use client";

import { motion } from "framer-motion";

/**
 * TODO: Pulse effect on text shadow
 */
export function PulseTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1 className="font-display text-center text-7xl mb-6 shadow-glow">
      {children}
    </motion.h1>
  );
}

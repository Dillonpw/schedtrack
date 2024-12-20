"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Donation() {
  return (
    <motion.div
      animate={{
        x: [0, -5, 5, -5, 5, 0], // Up and down motion
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 3,
        repeatType: "loop",
      }}
    >
      <Link
        className="flex justify-center py-8 text-lg hover:underline dark:bg-muted"
        href="https://buy.stripe.com/7sIaFa7EQeJzbW8aEG"
      >
        Help Us Keep The Lights On 💡
      </Link>
    </motion.div>
  );
}

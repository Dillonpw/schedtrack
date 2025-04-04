"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Donation() {
  return (
    <div className="flex w-full justify-center overflow-hidden">
      <motion.div
        className="w-fit"
        animate={{
          x: [0, -5, 5, -5, 5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          repeatType: "loop",
        }}
      >
        <Link
          className="block px-4 py-8 text-lg font-semibold whitespace-nowrap hover:scale-101"
          href="https://buy.stripe.com/7sIaFa7EQeJzbW8aEG"
        >
          Help Us Keep The Lights On 💡
        </Link>
      </motion.div>
    </div>
  );
}

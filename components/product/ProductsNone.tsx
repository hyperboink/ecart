"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { SearchX } from "lucide-react";

interface Props {
    className?: string;
}

const ProductsNone = ({ className }: Props) => {
  return (
        <div className={cn('flex flex-col items-center justify-center h-[70vh] text-center px-4 py-8', className)}>
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative p-8 rounded-full bg-gradient-to-tr from-blue-100 via-indigo-100 to-purple-100 shadow-xl"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-10 blur-2xl" />
            <SearchX size={72} className="text-primary-main drop-shadow-md relative z-10" />
          </motion.div>
    
          <h2 className="text-2xl font-semibold mt-8 text-gray-800">No Products Found</h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Opps empty! Try to refine or reset filters.
          </p>
        </div>
  );
};

export default ProductsNone;
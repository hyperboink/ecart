import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from "framer-motion";
import Link from 'next/link';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4 py-8">
            <motion.div
                animate={{
                    y: [0, -4, 0],
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                className="relative p-8 rounded-full bg-gradient-to-tr from-blue-100 via-indigo-100 to-purple-100 shadow-xl">
                <div className="absolute inset-0 rounded-full bg-white opacity-10 blur-2xl" />
                
                <ShoppingBag size={72} className="text-primary-main drop-shadow-md relative z-10"/>
            </motion.div>

            <h2 className="text-2xl font-semibold mt-8 text-gray-800">Your cart is empty</h2>
            <p className="text-gray-500 mt-2 max-w-md">Looks like you haven’t added anything to your cart yet.</p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 rounded-full bg-primary-main text-white font-medium shadow-md hover:bg-primary-main transition">
                <Link href={'/'}>Browse Products</Link>
            </motion.button>
        </div>
    )
}

export default EmptyCart;
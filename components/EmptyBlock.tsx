import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
    title?: string;
    content?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number; className?: string }>;
    className?: string;
    hasButton?: boolean;
}

const EmptyBlock = ({
    title = 'Nothing in here',
    content = 'This is so lonely.',
    icon: Icon = () => null,
    className,
    hasButton = true
}: Props) => {
    return (
        <div className={cn('flex flex-col items-center justify-center h-[70vh] text-center px-4 py-8', className)}>

            {Icon && (
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
                    
                    <Icon size={72} className="text-primary-main drop-shadow-md relative z-10" />
                    
                </motion.div>
            )}

            <h2 className="text-2xl font-semibold mt-8 text-gray-800">{title}</h2>
            <p className="text-gray-500 mt-2 max-w-md">{content}</p>

            {hasButton && <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 rounded-full bg-primary-main text-white font-semibold shadow-md hover:bg-primary-main transition">
                <Link href={'/'}>Browse Products</Link>
            </motion.button> }
        </div>
    )
}

export default EmptyBlock
import React from 'react';
import Link from 'next/link';
import { heroGadget } from '@/images';
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#7c3aed] via-violet-700 to-indigo-900 text-white rounded-2xl shadow-lg overflow-hidden px-6 py-16 md:py-24 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl just">
                    Don&apos;t miss the <span className="text-yellow-300">hot deals</span> of the week!
                </h2>

                <p className="text-white/90 text-base sm:text-lg max-w-xl">
                    Discover premium gadgets at unbeatable prices. Limited-time offers you can't afford to miss!
                </p>

                <Link
                    href="/special-deal"
                    className="inline-flex items-center gap-2 mt-6 bg-white text-[#7c3aed] hover:bg-violet-100 text-sm sm:text-base font-semibold px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105">
                    Shop Now
                    <ArrowRightCircle className="w-5 h-5" />
                </Link>
            </div>

            <div className="flex-1 relative">
                    <Image
                    src={heroGadget}
                    alt="Tech gadget"
                    className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain mx-auto drop-shadow-2xl"
                    priority
                />
            </div>
        </div>
    </section>
  );
};

export default HeroBanner;

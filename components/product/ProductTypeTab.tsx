import React from 'react';
import Link from 'next/link';
import { productTabData } from '@/app/constants/data';

interface Props {
    selectedTab: string,
    onTabSelect: (tab: string) => void
}

const ProductTypeTab = ({selectedTab, onTabSelect}: Props) => {
    return (
        <div className='flex items-center justify-between flex-wrap gap-5'>
            <div className='flex items-center gap-1.5 text-sm font-semibold'>
                {productTabData.map((item, index) => (
                    <button key={index} onClick={() => onTabSelect(item?.title)} className={`${selectedTab === item?.title && 'bg-black text-white'} border border-black  px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-black hover:text-white hover-transition`}>{item?.title}</button>
                ))}
            </div>
            <Link href="/shop" className='bg-black font-semibold text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-primary-main hover:text-white hover-transition'>See all</Link>
        </div>
    )
}

export default ProductTypeTab;
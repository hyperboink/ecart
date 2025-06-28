'use client';

import React from 'react';
import useStore from '@/store';
import { Heart } from 'lucide-react';
import Link from 'next/link';


const WishListBtn = () => {
    const { wishListProducts } = useStore();

    return (
        <Link href={'/wishlist'} className='relative group flex items-center'>
            <Heart className='w-5 h-5'/>
            {wishListProducts?.length ? (
                <span className='absolute -top-[7px] -right-2 rounded-full text-xs bg-primary-main text-white w-4 h-4 text-center'>{wishListProducts.length}</span>
            ) : ''}
        </Link>
    )
}

export default WishListBtn;
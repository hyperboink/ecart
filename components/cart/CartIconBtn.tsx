'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import useStore from '@/store';

const CartIconBtn = () => {
  const { items } = useStore();

  return (
    <Link href={'/cart'} className='relative group flex items-center'>
      <ShoppingCart className='w-5 h-5'/>
      {items?.length ? (
        <span className='absolute -top-[7px] -right-2 rounded-full text-xs bg-red-600 text-white w-4 h-4 text-center'>{items.length}</span>
      ) : ''}
    </Link>
  )
}

export default CartIconBtn;
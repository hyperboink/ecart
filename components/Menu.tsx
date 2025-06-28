'use client';

import React from 'react';
import { menuData } from '@/app/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Menu = () => {
    const pathname = usePathname();

    return (
        <div className='hidden md:inline-flex w-1/3 gap-7 items-center justify-center text-sm capitalize font-semibold'>
            {menuData.map((menu) => (
                <Link className={`hover:text-primary-main hoverEffect relative group ${pathname === menu?.href && 'text-primary-main' }`} key={menu.title} href={menu.href}>
                    {menu.title}
                    <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-primary-main group-hover:w-1/2 group-hover:left-0 hover-transition ${pathname === menu?.href && 'w-1/2' }`}></span>
                    <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-primary-main group-hover:w-1/2 group-hover:right-0 hover-transition ${pathname === menu?.href && 'w-1/2' }`}></span>
                </Link>
            ))}
    </div>
  )
}

export default Menu
import React, { FC } from 'react';
import { X } from 'lucide-react';
import { menuData } from '@/app/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Social from './Social';
import { useOuterClick } from '@/hooks';

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
};

const SidebarMenu: FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const sidebarMenuRef = useOuterClick<HTMLDivElement>(onClose);

    return (
        <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white shadow-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} hover-transition`}>
            <div className='relative min-w-72 max-w-96 bg-black h-screen p-10 border-r border-primary-main flex flex-col gap-6'>
                <div className='text-white flex items-center justify-between tracking-wide'>
                    <Logo />
                    <button onClick={onClose}><X /></button>
                </div>

                <div className='flex flex-col space-y-3.5 font-semibold' ref={sidebarMenuRef}>
                    {menuData.map((menu) => (
                        <Link key={menu.title} href={menu.href} onClick={onClose} className={`hover-transition ${pathname === menu?.href && 'text-primary-main'}`}>{menu.title}</Link>
                    ))}
                </div>

                <Social />
            </div>
        </div>
    )
}

export default SidebarMenu;
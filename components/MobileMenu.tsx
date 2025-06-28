'use client';

import React, { useState } from 'react';
import { AlignLeft } from 'lucide-react';
import SidebarMenu from './SidebarMenu';

const MobileMenu = () => {
    const [isSidebarMenuOpen, setIsSideBarMenuOpen] = useState(false); 

    return (
        <>
            <button onClick={() => setIsSideBarMenuOpen(!isSidebarMenuOpen)}>
                <AlignLeft className='md:hidden'/>
            </button>

            <div className="md:hidden">
                <SidebarMenu isOpen={isSidebarMenuOpen} onClose={() => setIsSideBarMenuOpen(false)} />
            </div>
            
        </>
    )
}

export default MobileMenu;
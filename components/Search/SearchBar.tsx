'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchDialog from './SearchDialog';

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex items-center'>
            <Search className='w-5 h-5 cursor-pointer' onClick={() => setIsOpen(true)}/>
            <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </div>
    )
}

export default SearchBar;
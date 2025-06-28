import React from 'react';
import Container from './Container';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import SearchBar from './Search/SearchBar';
import CartIconBtn from './cart/CartIconBtn';
import WishListBtn from './wishlist/WishListBtn';
import SignIn from './SignIn';
import { currentUser } from '@clerk/nextjs/server';
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Logs } from 'lucide-react';

const Header = async() => {
    const user = await currentUser();

    return (
        <header className='bg-white/80 py-5 sticky top-0 z-50 backdrop-blur-md'>
            <Container className='flex item-center justify-between'>
                <div className='w-auto md:w-1/3 flex items-center md:gap-0 gap-2.5 justify-start'>
                    <MobileMenu />
                    <Logo />
                </div>

                <Menu />

                <div className="flex items-center justify-end gap-4 md:w-1/3">
                    <SearchBar />
                    <CartIconBtn />
                    <WishListBtn />

                    <ClerkLoaded>
                        <SignedIn>
                            <Link href={'/orders'}>
                                <Logs />
                            </Link>
                           <UserButton />
                        </SignedIn>
                        
                        {!user && <SignIn />}
                    </ClerkLoaded>
                    
                </div>
            </Container>
        </header>
  )
}

export default Header
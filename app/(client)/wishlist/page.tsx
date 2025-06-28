import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import Login from '@/components/Login';
import WishlistProducts from '@/components/wishlist/WishlistProducts';

const WishListPage = async() => {
    const user = await currentUser();
    return (
        <>
            {user ? <WishlistProducts /> : <Login content='Login in to continue with your wishlist.'/>}
        </>
    )
}

export default WishListPage;
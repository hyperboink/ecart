'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/sanity.types';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import useStore from '@/store';
import toast from 'react-hot-toast';

interface Props {
    isProductPage?: boolean;
    product: Product,
    className?: string
}

const AddToWishListButton = ({ product, isProductPage, className }: Props) => {
    const { wishListProducts, addToWishList } = useStore();
    const [isWishListed, setIsWishListed] = useState<Product | null>(null);

    useEffect(() => {
        const availableProduct = wishListProducts?.find(item => item?._id === product?._id);

        setIsWishListed(availableProduct || null);
    }, [product, wishListProducts]);

    const wishListHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if(!product?._id){
            return;
        }

        addToWishList(product).then(() => {
            toast.success(`Product is ${isWishListed ? 'removed from' : 'added to'} wishlist.`);
        });
    }
  
    return (
        <>
            {!isProductPage ? (
                <div onClick={wishListHandler} className={cn('absolute top-2 right-2 z-10', className)}>
                    <div className={cn(`p-1 rounded-full text-primary-dark cursor-pointer hover:bg-gray-500 hover:text-white hover-transition ${isWishListed && 'bg-primary-main hover:bg-primary-dark text-white'}`, className)}>
                        <Heart size={15} />
                    </div>
                </div>
            ) : (
                <button onClick={wishListHandler} className={`group relative border text-primary-main border-primary-main p-1.5 rounded-sm ${isWishListed && 'bg-primary-main'} hover-transition`}>
                    <Heart className={`'text-primary-main mt-.5 w-5 h-5 ${isWishListed && 'text-white'}`}/>
                </button>
            )}
        </>
    )
}

export default AddToWishListButton;
'use client';

import React from 'react';
import { Product } from '@/sanity.types';
import { Button } from '../ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import useStore from '@/store';
import toast from 'react-hot-toast';
import CurrencyFormat from '../CurrencyFormat';
import QuantityButton from '../product/QuantityButton';

interface Props {
    product: Product;
    isProductPage?: boolean;
    className?: string;
}

const AddToCartButton = ({ product, isProductPage, className }: Props) => {
    const { addItem, getItemCount } = useStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;

    const addToCart = () => {
        if(isOutOfStock){
            return;
        }

        if((product?.stock as number) > itemCount){
            addItem(product);

            toast.success(`${product?.name?.substring(0,12)}... added successfully.`);
        }else{
            toast.error('Can\'t add more.');
        }
    }

    return (
        <div className={`w-full h-12 flex items-center ${isProductPage && 'items-start'}`}>
            {itemCount ? (
                <div className='w-full text-sm'>
                    <div className={`flex items-center justify-between ${isProductPage && 'pb-2'}`}>
                        <span className={`${!isProductPage && 'text-sm'} text-gray-500`}>Quantity</span>
                        <QuantityButton product={product}/>
                    </div>

                    <div className={`flex items-center justify-between border-t pt-1 ${isProductPage && 'pt-2'}`}>
                        <span className='text-sm font-semibold'>Subtotal</span>
                        <CurrencyFormat amount={product?.price ? product?.price * itemCount : 0}/>
                    </div>
                </div>
            ) : (
                <Button
                    className={cn(`w-full text-white bg-primary-dark shadow-none tracking-wide hover:bg-primary-main hover-transition font-semibold ${isOutOfStock && 'bg-primary-dark/50 hover:bg-primary-dark/50'}`, className)}
                    onClick={addToCart}>
                    <ShoppingBag /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            )}
            
        </div>
    )
}

export default AddToCartButton;
import { Product } from '@/sanity.types';
import useStore from '@/store';
import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    className?: string;
}

const QuantityButton = ({ product, className }: Props) => {
    const { addItem, removeItem, getItemCount } = useStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock = product?.stock === 0;

    const removeProduct = () => {
        removeItem(product?._id);

        if(itemCount > 1){
            toast.success("Updated cart.");
        }else{
            toast.success(`${product?.name?.substring(0, 12)} was removed.`);
        }
    };
    
    const addProduct = () => {
        if((product?.stock as number) > itemCount){
            addItem(product);
            toast.success("Added one more to your cart.");
        }else{
            toast.error("Can not add more than available stock");
        }
    };

    return (
        <div className={cn('flex items-center gap-1 pb-1 text-base', className)}>
            <Button
                onClick={removeProduct}
                variant='outline'
                size='icon'
                disabled={itemCount === 0 || isOutOfStock}
                className='w-6 h-6 hover:bg-gray-100'>
                <Minus />
            </Button>

            <span className='font-semibold inline-block min-w-5 text-sm text-center'>{itemCount}</span>

            <Button
                onClick={addProduct}
                variant='outline'
                size='icon'
                disabled={isOutOfStock}
                className='w-6 h-6 hover:bg-gray-100'>
                    <Plus />
            </Button>
        </div>
    )
}

export default QuantityButton;
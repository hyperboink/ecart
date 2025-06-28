import { Product } from '@/sanity.types';
import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import AddToWishListButton from '../wishlist/AddToWishListButton';
import { Heading } from '../ui/text';
import { StarIcon } from 'lucide-react';
import Price from './Price';
import AddToCartButton from '../cart/AddToCartButton';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className='texts-sm border-[1px] border-gray-300 rounded-md bg-white group'>
            <div className='relative group overflow-hidden bg-gray-100'>
                {product?.images && (
                    <Link href={`/product/${product?.slug?.current}`}>
                        <Image src={urlFor(product?.images[0]).url()} alt="" className={`w-full h-64 object-contain overflow-hidden transition-transform hover-effect ${product?.stock !== 0 ? 'group-hover:scale-105' : 'opacity-50'}`} loading="lazy" width={700} height={700} />
                    </Link>
                )}
    
                {product?.status === 'sale' && (
                    <div className='font-semibold absolute top-2 left-2 z-10 text-xs border border-primary-main text-primary-main px-2 py-1 rounded-full'>Sale</div>
                )}

                {product?.status === 'hot' && (
                    <div className='font-semibold absolute top-2 left-2 z-10 text-xs border border-red-500 text-red-500 px-2 py-1 rounded-full'>Hot!</div>
                )}

                <AddToWishListButton product={product} />
            </div>

            <div className='p-3 flex flex-col gap-1'>
                {product?.categories && (
                    <p className='uppercase line-clamp-1 text-xs text-gray-500'>{product?.categories?.map((category) => category).join(', ')}</p>
                )}

                <Link href={`/product/${product?.slug?.current}`}><Heading className='text-sm line-clamp-1'>{product?.name}</Heading></Link>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-0.5'>
                        {[...Array(5)].map((_, index) => (
                            <StarIcon size={12} key={index} className={index < 4 ? 'text-yellow-500' : 'text-gray-300'} fill={index < 4 ? '#f0b100' : '#ebe6e7'}/>
                        ))}
                    </div>

                    <p className='text-sm tracking-wide'>5 Reviews</p>
                </div>

                <div className='flex items-center gap-1'>
                    <p className='font-medium'>In Stock: </p>
                    <p>{(product?.stock as number) > 0 ? product?.stock : <span className='text-red-700'>Not available</span>}</p>
                </div>

                <Price price={product?.price} discount={product?.discount} className='text-sm'/>

                <AddToCartButton product={product} className='w-36 mt-1 rounded-full' />
            </div>
        </div>
    )
}

export default ProductCard;
'use client';

import useStore from '@/store';
import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { CalendarHeart, HeartOff, Trash2 } from 'lucide-react';
import Link from 'next/link';
import EmptyBlock from '../EmptyBlock';
import Image from 'next/image';
import { Button } from '../ui/button';
import CurrencyFormat from '../CurrencyFormat';
import AddToCartButton from '../cart/AddToCartButton';
import { toast } from 'react-hot-toast';
import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Loader from '../Loader';

const WishlistProducts = () => {
    const { wishListProducts, removeFromWishList, resetWishList } = useStore();
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasData = wishListProducts && wishListProducts.length > 0;

            if (!hasData) {
                setTimeout(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }
      }, [wishListProducts]);

    const loadMore = () => {
        setVisibleProducts((prev) => Math.min(prev + 5, wishListProducts.length));
    };

    const handleResetWishlist = () => {
        if (window.confirm('Are you sure you want to reset your wishlist?')) {
            resetWishList();
            toast.success('Wishlist reset successfully');
        }
    };

    return (
        <>
            {!loading ? (
                <Container className="py-10">
                    {wishListProducts?.length > 0 ? (
                        <>
                            <div className="flex items-start justify-between">
                                <h2 className="text-xl font-bold flex gap-2">
                                    <CalendarHeart className='text-primary-main' />
                                    <span>Wishlist</span>
                                </h2>
                                <button
                                    onClick={handleResetWishlist}
                                    className="text-sm text-violet-600 underline hover:text-violet-800 transition"
                                >
                                    Reset All
                                </button>
                            </div>
        
                            <div className="flex flex-col space-y-5 mt-6">
                                {wishListProducts.slice(0, visibleProducts).map((product: Product) => (
                                    <div
                                        key={product._id}
                                        className="relative flex flex-col sm:flex-row sm:items-start gap-4 border border-gray-300 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <button
                                            onClick={() => {
                                                removeFromWishList(product._id);
                                                toast.success('Removed from wishlist');
                                            }}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
        
                                        <div className="shrink-0">
                                            {product?.images && (
                                                <Link href={`/product/${product?.slug?.current}`}>
                                                    <Image
                                                        src={urlFor(product?.images?.[0]).url()}
                                                        alt={product?.name as string}
                                                        width={96}
                                                        height={96}
                                                        className="rounded-md object-contain w-24 h-24 border border-gray-200 bg-gray-100"
                                                    />
                                                </Link>
                                            )}
                                        </div>
        
                                        <div className="flex flex-1 justify-between w-full">
                                            <div className="pr-4">
                                                <Link href={`/product/${product?.slug?.current}`}>
                                                    <h3 className="text-base font-semibold text-gray-900 hover:underline line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                </Link>
        
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    Variant: {product?.variant || 'N/A'}
                                                </p>
                                                <div className="mt-1">
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                                            (product?.stock as number) > 0
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {(product.stock as number) > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </div>
                                            </div>
        
                                            <div className="flex flex-col items-end gap-2 mt-6 min-w-[120px]">
                                                <CurrencyFormat amount={product.price} />
                                                <AddToCartButton
                                                    product={product}
                                                    className="w-full sm:w-auto rounded-full bg-violet-600 text-white hover:bg-violet-700"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
        
                            <div className="flex justify-center gap-4 mt-8 flex-wrap">
                                {visibleProducts < wishListProducts.length && (
                                    <Button variant="outline" onClick={loadMore} className="border-gray-300 text-gray-800">
                                        Load More
                                    </Button>
                                )}
                                {visibleProducts > 8 && (
                                    <Button variant="outline" onClick={() => setVisibleProducts(8)} className="border-gray-300 text-gray-800">
                                        Show Less
                                    </Button>
                                )}
                            </div>
                        </>
                    ) : (
                        <EmptyBlock
                            icon={HeartOff}
                            title="Your wishlist is empty"
                            content="Start exploring and save your favorite items to find them easily later."
                        />
                    )}
                </Container>
            ) : <Loader />}
        </>
        
    );
};

export default WishlistProducts;

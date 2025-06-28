'use client';

import React, { useEffect, useState, useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "../ui/dialog";
import { Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { Input } from '../ui/input';
import { useDebounce } from '@/hooks';
import { PRODUCTS_QUERY } from '@/sanity/queries/query';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';

interface Props {
    isOpen?: boolean;
    onClose?: () => void;
}

const SearchDialog = ({ isOpen, onClose }: Props) => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await client.fetch(PRODUCTS_QUERY);
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const filterProducts = () => {
        const filtered = products?.filter(product =>
            product?.name?.toLowerCase().includes(debouncedSearchText.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        if (isOpen) fetchProducts();
    }, [isOpen]);

    useEffect(() => {
        filterProducts();
    }, [debouncedSearchText]);

    const handleProductClick = (slug: string) => {
        setLoading(true);
        startTransition(() => {
            router.push(`/product/${slug}`);
            onClose?.();
            setLoading(false);
            setSearchText('');
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-md p-0 pb-7">
                <DialogHeader className="sticky top-0 z-20 bg-white px-4 py-4 border-b shadow-sm">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-semibold">Search Product</DialogTitle>
                        <DialogClose className="text-gray-500 hover:text-gray-700 transition-colors">
                            <X className="w-5 h-5" />
                        </DialogClose>
                    </div>

                    <Input
                        placeholder="Search products..."
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        className="mt-4 font-semibold h-11"
                    />
                </DialogHeader>

                <div className="relative">
                    <div className="overflow-y-auto max-h-[calc(80vh-120px)] px-4 space-y-4 text-gray-700 flex flex-col">
                        {filteredProducts?.map((product) => (
                            <button
                                key={product._id}
                                onClick={() => handleProductClick(product?.slug?.current as string)}
                                className="text-left hover:text-primary-main cursor-pointer hover-transition font-semibold w-full"
                                disabled={isPending}
                            >
                                {product.name}
                            </button>
                        ))}
                    </div>

                    {loading && (
                        <div className="absolute -top-4 inset-0 z-30 flex justify-center items-center bg-white/80 min-h-15">
                            <Loader className='bg-transparent p-0 min-h-0'/>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;

'use client';

import React, { useEffect, useState } from 'react';
import ProductTypeTab from './ProductTypeTab';
import { productTabData } from '@/app/constants/data';
import { client } from '@/sanity/lib/client';
import { AnimatePresence, motion } from 'motion/react';
import { SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/sanity.types';
import Loader from '../Loader';
import EmptyBlock from '../EmptyBlock';

const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(productTabData[0]?.title);

    const query = `*[_type == 'product' && variant == $variant] | order(name desc) {
        ..., 'categories': categories[]->title
    }`;

    const params = { variant: selectedTab.toLowerCase() };

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try{
                const res = await client.fetch(query, params);
                setProducts(res);
            }catch(error){
                console.log('Product fetching error:', error);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [selectedTab]);

    return (
        <div>
            <ProductTypeTab selectedTab={selectedTab} onTabSelect={setSelectedTab}/>
            {loading ? (
                <Loader className='min-h-150'/>
            ) : (
                products?.length ? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
                    {products.map((product) => (
                        <AnimatePresence key={product?._id}>
                            <motion.div
                                layout
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0.2 }}>
                                <ProductCard product={product}/>
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </div>
                ): (
                    <EmptyBlock
                        icon={SearchX}
                        className='h-[400px]'
                        hasButton={false}
                        title='No products found :('
                        content='Try to refine or reset filters.' />
                )
            )}
        </div>
    )
}

export default ProductGrid;
'use client';

import React, { useEffect, useState } from 'react';
import { BRANDS_QUERYResult, Category, Product } from '@/sanity.types';
import Container from '../Container';
import { Heading } from '../ui/text';
import { useSearchParams } from 'next/navigation';
import CategoryList from './CategoryList';
import BrandList from './BrandList';
import PriceList from './PriceList';
import { client } from '@/sanity/lib/client';
import { SearchX, Store } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import Loader from '../Loader';
import EmptyBlock from '../EmptyBlock';

interface Props {
    categories: Category[];
    brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
    const searchParams = useSearchParams();
    const brandParams = searchParams?.get('brand');
    const categoryParams = searchParams?.get('category');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string|null>(categoryParams || null);
    const [selectedBrand, setSelectedBrand] = useState<string|null>(brandParams || null);
    const [selectedPrice , setSelectedPrice] = useState<string|null>(null);

    const fetchProducts = async () => {
        setLoading(true);

        try {
            let minPrice = 0;
            let maxPrice = 10000;

            if (selectedPrice) {
                const [min, max] = selectedPrice.split("-").map(Number);
                minPrice = min;
                maxPrice = max;
            }

            const query = `
                *[_type == 'product' 
                    && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
                    && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
                    && price >= $minPrice && price <= $maxPrice
                ] 
                | order(name asc) {
                    ...,"categories": categories[]->title
                }
            `;

            const data = await client.fetch(
                query,
                { selectedCategory, selectedBrand, minPrice, maxPrice },
                { next: { revalidate: 0 } }
            );

            setProducts(data);
        } catch (error) {
          console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = () => {
        setSelectedCategory(null);
        setSelectedBrand(null);
        setSelectedPrice(null);
    }

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, selectedBrand, selectedPrice]);
    
    return (
        <div className='pt-5 pb-20'>
            <Container className='mt-5'>
                <div className='sticky top-0 z-10 mb-5'>
                    <div className='flex items-end justify-between'>
                        <Heading icon={Store}>Shop</Heading>

                        {(selectedCategory || selectedBrand || selectedBrand) && (
                            <button onClick={resetFilters} className='text-sm underline mt-2 font-medium text-primary-main hover:text-primary-dark'>Reset Filters</button>
                        )}
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='md:sticky md:top-20 md:self-start md:h-[cal(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5'>
                        <CategoryList
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}/>

                        <BrandList
                            brands={brands}
                            selectedBrand={selectedBrand}
                            setSelectedBrand={setSelectedBrand}/>

                        <PriceList
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}/>
                    </div>

                    <div className='flex-1 pt-5'>
                        <div className='h-[cal(100vh-160px)] overflow-y-auto pr-2'>
                            {!loading ? 
                                products && products?.length > 0 ? (
                                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5'>
                                        {products?.map((product) => (
                                            <ProductCard key={product?._id} product={product} />
                                        ))}
                                    </div>
                                ) : <EmptyBlock
                                        icon={SearchX}
                                        className='h-[400px]'
                                        hasButton={false}
                                        title='No products found :('
                                        content='Try to refine or reset filters.' />
                            : <Loader />}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Shop;
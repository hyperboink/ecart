'use client';

import React, { useEffect, useState } from 'react';
import { Category, Product } from '@/sanity.types';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { AnimatePresence, motion } from 'motion/react';
import ProductCard from './product/ProductCard';
import { SearchX } from 'lucide-react';
import Loader from './Loader';
import EmptyBlock from './EmptyBlock';

interface Props {
	categories?: Category[];
	slug?: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
	const [currentSlug, setCurrentSlug] = useState(slug);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const handleCategoryChange = (newSlug: string) => {
		if (newSlug === currentSlug) return;
		setCurrentSlug(newSlug);
	};

	const fetchProducts = async (categorySlug: string) => {
		setLoading(true);
		try {
			const query = `
				*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
					...,
					"categories": categories[]->title
				}
			`;
			const data = await client.fetch(query, { categorySlug });
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts(currentSlug as string);
	}, [currentSlug]);

	return (
		<div className="flex flex-col md:flex-row gap-6 py-6 items-start">
			<aside className="w-full md:w-56 max-h-[70vh] overflow-y-auto border rounded-lg shadow-sm bg-white">
				<div className="flex flex-col divide-y divide-gray-100">
					{categories?.map((category) => {
						const isActive = category?.slug?.current === currentSlug;
						return (
							<Button
								key={category?._id}
								onClick={() => handleCategoryChange(category?.slug?.current as string)}
								variant="ghost"
								className={`capitalize w-full justify-start px-5 py-3 text-sm font-medium rounded-none
									${isActive
										? 'bg-primary-main text-white hover:bg-primary-main/90 hover:text-white'
										: 'hover:bg-gray-100'}
								`}
							>
								{category?.title}
							</Button>
						);
					})}
				</div>
			</aside>

			<main className="flex-1 w-full">
				{loading ? (
					<Loader className='min-h-100' />
				) : products?.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
						{products?.map((product: Product) => (
							<AnimatePresence key={product._id}>
								<motion.div>
									<ProductCard product={product} />
								</motion.div>
							</AnimatePresence>
						))}
					</div>
				) : (
					<EmptyBlock
						icon={SearchX}
						className='h-[400px]'
						hasButton={false}
						title='No products found :('
						content='Try to refine or reset filters.'
					/>
				)}
			</main>
		</div>
	);
};

export default CategoryProducts;

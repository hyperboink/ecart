import React from 'react';
import { getAllBrands } from '@/sanity/queries';
import Link from 'next/link';
import { Heading } from './ui/text';
import { Brand } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRightCircle, Building2 } from 'lucide-react';

const BrandBlocks = async () => {
	const brands = await getAllBrands();
	const displayedBrands = brands.slice(0, 8);

	return (
		<div className="pb-10">
			<div className="flex items-center justify-between mb-6">
				<Heading icon={Building2}>Brands</Heading>
				<Link
					href="/shop"
					className="text-sm font-semibold flex gap-2 text-primary-main hover:underline"
				>
					View all <ArrowRightCircle className="w-5 h-5" />
				</Link>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 place-items-center">
				{displayedBrands.map((brand: Brand) => (
					<Link
						key={brand._id}
						href={{
							pathname: '/shop',
							query: { brand: brand?.slug?.current }
						}}
						className="group"
					>
						{brand?.image && (
							<div className="w-24 h-14 flex items-center justify-center">
								<Image
									src={urlFor(brand.image).url()}
									alt={brand.title || 'Brand'}
									width={160}
									height={80}
									className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition duration-300"
								/>
							</div>
						)}
					</Link>
				))}
			</div>
		</div>
	);
};

export default BrandBlocks;

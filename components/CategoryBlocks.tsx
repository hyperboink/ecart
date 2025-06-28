import React from 'react';
import { Heading } from './ui/text';
import { getCategories } from '@/sanity/queries';
import { Category } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { ListCollapse } from 'lucide-react';

const CategoryBlocks = async ({ limit }: { limit?: number }) => {
  const categories = await getCategories(limit);

  return (
    <section className="py-12">
      <Heading className=" pb-4 mb-2" icon={ListCollapse}>
        Popular Categories
      </Heading>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: Category) => (
          <Link
            key={category._id}
            href={`/category/${category?.slug?.current}`}
            className="group flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200  transition duration-300"
          >
            {category?.image && (
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <Image
                  src={urlFor(category.image).url()}
                  alt={category.title as string}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-main">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{category.productCount}</span> items available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryBlocks;

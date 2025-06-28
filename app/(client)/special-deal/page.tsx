import React from 'react';
import { getSpecialDealProducts } from '@/sanity/queries';
import Container from '@/components/Container';
import { Heading } from '@/components/ui/text';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/sanity.types';
import { BadgePercent } from 'lucide-react';

const SpecialDealPage = async() => {
  const products = await getSpecialDealProducts();
  return (
    <div className='py-10'>
      <Container>
        <Heading className='font-sans text-xl font-bold mb-6 flex items-center gap-2'>
          <BadgePercent className='text-primary-main'/>
          <span>Special Deal</span>
        </Heading>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2.5'>
          {products?.map((product: Product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default SpecialDealPage;
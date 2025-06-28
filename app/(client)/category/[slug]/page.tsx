import React from 'react';
import Container from '@/components/Container';
import { Heading } from '@/components/ui/text';
import { getCategories } from '@/sanity/queries';
import CategoryProducts from '@/components/CategoryProducts';

const CategoryPage = async({ params } : { params: Promise<{ slug: string }> }) => {
  const categories = await getCategories();
  const { slug } = await params;

  return (
    <div className="py-10">
      <Container>
        <Heading>
          Products by Categories:
          <span className='font-bold text-primary-main capitalize tracking-wide'> {slug && slug}</span>
        </Heading>

        <CategoryProducts categories={categories} slug={slug}/>
      </Container>
    </div>
  )
}

export default CategoryPage;
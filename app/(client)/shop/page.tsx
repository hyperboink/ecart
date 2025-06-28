import React from 'react';
import { getAllBrands, getCategories } from '@/sanity/queries';
import Shop from '@/components/shop/Shop';

const ShopPage = async() => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return <Shop categories={categories} brands={brands}/>
}

export default ShopPage;
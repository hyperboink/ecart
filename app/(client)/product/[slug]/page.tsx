import React from 'react';
import Container from '@/components/Container';
import ProductImages from '@/components/product/ProductImages';
import { getProductBySlug } from '@/sanity/queries';
import { StarIcon } from 'lucide-react';
import Price from '@/components/product/Price';
import AddToCartButton from '@/components/cart/AddToCartButton';
import AddToWishListButton from '@/components/wishlist/AddToWishListButton';
import ProductAttributes from '@/components/product/ProductAttributes';

const SingleProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      {product && <ProductImages images={product?.images} stock={product.stock} />}

      <div className='w-full md:w-1/2 flex flex-col gap-5'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-bold '>{product?.name}</h2>

          <p className='text-sm text-gray-600 tracking-wide'>{product?.description}</p>

          <div className='flex items-center gap-0.5 text-xs'>
            {[...Array(5)].map((_, index) => (
                <StarIcon size={12} key={index} className={index < 4 ? 'text-yellow-500' : 'text-gray-300'} fill={index < 4 ? '#f0b100' : '#ebe6e7'}/>
            ))}
            
            <p className='font-semibold'>{`100`}</p>
          </div>
        </div>

        <div className='space-y-2 border-t border-b py-5'>
          <Price price={product?.price} discount={product?.discount} className='text-lg font-bold'/>

          <p className={`px-4 py-1.5 font-semibold rounded-lg inline-block text-center text-sm ${product?.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{(product?.stock as number > 0) ? 'In Stock' : 'Out of Stock'}</p>
        </div>

        <div className='flex items-start gap-2.5 lg:gap-2.5 relative'>
          <AddToCartButton isProductPage={true} product={product} />
          <AddToWishListButton isProductPage={true} product={product}/>
        </div>

        <ProductAttributes product={product}/>
      </div>
    </Container>
  );
};

export default SingleProductPage;
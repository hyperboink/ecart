import React from 'react';
import CurrencyFormat from '../CurrencyFormat';

interface Props {
    price: number | undefined;
    discount: number | undefined;
    className?: string;
}

const Price = ({ price, discount }: Props) => {
  return (
    <div className='flex items-center gap-2'>
        <CurrencyFormat amount={price} className='text-primary-dark'/>
        {price && discount && <CurrencyFormat amount={price + (discount * price) / 100} className='line-through font-normal text-gray-500'/>}
    </div>
  )
}

export default Price;
import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Heading } from '../ui/text';
import { Label } from '../ui/label';

interface Props {
    selectedPrice: string|null;
    setSelectedPrice: React.Dispatch<React.SetStateAction<string|null>>;
}

const priceData = [
    { title: 'Under $100', value: '0-100' },
    { title: '$100 - $200', value: '100-200' },
    { title: '$200 - $300', value: '200-300' },
    { title: '$300 - $500', value: '300-500' },
    { title: 'Over $500', value: '500-1000' },
];

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className='w-full bg-white p-5'>
        <Heading className='text-base font-semibold mb-5'>Price</Heading>

        <RadioGroup value={selectedPrice || ''} className='mt-2 space-y-1'>
            {priceData.map((price, index) => (
                <div
                    key={index}
                    className='flex items-center space-x-2 hover:cursor-pointer'
                    onClick={() => setSelectedPrice(price?.value)}>
                    <RadioGroupItem
                        value={price?.value}
                        id={price?.value}
                        className='rounded-sm'></RadioGroupItem>
                    
                    <Label
                        htmlFor={price?.value}
                        className={`${selectedPrice === price?.value ? 'font-semibold text-primary-main' : 'font-normal'} capitalize`}>{price?.title}</Label>
                </div>
            ))}

            {selectedPrice && (
                <button onClick={() => setSelectedPrice(null)} className='text-sm text-left font-medium mt-2 underline underline-offset-2'>Reset selection</button>
            )}
        </RadioGroup>
    </div>
  )
}

export default PriceList
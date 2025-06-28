import { BRANDS_QUERYResult } from '@/sanity.types';
import React from 'react';
import { Heading } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
    brands: BRANDS_QUERYResult,
    selectedBrand: string|null;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string|null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
        <div className='w-full bg-white p-5'>
            <Heading className='text-base font-semibold mb-5'>Brands</Heading>
    
            <RadioGroup value={selectedBrand || ''} className='mt-2 space-y-1'>
                {brands.map((brand) => (
                    <div
                        key={brand?._id}
                        className='flex items-center space-x-2 hover:cursor-pointer'
                        onClick={() => setSelectedBrand(brand?.slug?.current as string)}>
                        <RadioGroupItem
                            value={brand?.slug?.current as string}
                            id={brand?.slug?.current}
                            className='rounded-sm'></RadioGroupItem>
                        
                        <Label
                            htmlFor={brand?.slug?.current}
                            className={`${selectedBrand === brand?.slug?.current ? 'font-semibold text-primary-main' : 'font-normal'} capitalize`}>{brand?.title}</Label>
                    </div>
                ))}

                {selectedBrand && (
                    <button onClick={() => setSelectedBrand(null)} className='text-sm text-left font-medium mt-2 underline underline-offset-2'>Reset selection</button>
                )}
            </RadioGroup>
        </div>
  )
}

export default BrandList
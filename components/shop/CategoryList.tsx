import { Category } from '@/sanity.types';
import React from 'react';
import { Heading } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
    categories: Category[];
    selectedCategory: string|null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string|null>>;
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: Props) => {
  return (
    <div className='w-full bg-white p-5'>
        <Heading className='text-base font-semibold mb-5'>Categories</Heading>

        <RadioGroup value={selectedCategory || ''} className='mt-2 space-y-1'>
            {categories.map((category) => (
                <div
                    key={category?._id}
                    className='flex items-center space-x-2 hover:cursor-pointer'
                    onClick={() => setSelectedCategory(category?.slug?.current as string)}>
                    <RadioGroupItem
                        value={category?.slug?.current as string}
                        id={category?.slug?.current}
                        className='rounded-sm'></RadioGroupItem>
                    
                    <Label
                        htmlFor={category?.slug?.current}
                        className={`${selectedCategory === category?.slug?.current ? 'font-semibold text-primary-main' : 'font-normal'} capitalize`}>{category?.title}</Label>
                </div>
            ))}

            {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className='text-sm text-left font-medium mt-2 underline underline-offset-2'>Reset selection</button>
            )}
        </RadioGroup>
    </div>
  )
}

export default CategoryList
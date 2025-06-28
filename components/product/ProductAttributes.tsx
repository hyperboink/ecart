import React from 'react';
import { Product } from '@/sanity.types';
import { getProductBrand } from '@/sanity/queries';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Bolt, Combine, NotebookTabs, SquareChartGantt } from 'lucide-react';

const ProductAttributes = async({ product }: { product: Product }) => {
  const brand = await getProductBrand(product?.slug?.current as string);
  
  return (
    <Accordion type='single' defaultValue="item-1" collapsible>
        <AccordionItem value='item-1'>
            <AccordionTrigger className='font-semibold'>{product?.name} Details:</AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col">
                    <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
                        <SquareChartGantt size={25} className="text-gray-500" />
                        <div>
                            <p className="text-base text-gray-500">
                                <span className='font-semibold'>Brand: </span>
                                <span>{brand && <span className='tracking-wide'>{brand[0].brandName}</span>}</span>
                            </p>
                        </div>
                    </div>
                    <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
                        <Combine size={25} className="text-gray-500" />
                        <div>
                            <p className="text-base text-gray-500">
                                <span className='font-semibold'>Collection: </span>
                                <span>{new Date().getFullYear()}</span>
                            </p>
                        </div>
                    </div>
                    <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
                        <Bolt size={25} className="text-gray-500" />
                        <div>
                            <p className="text-base text-gray-500">
                                <span className='font-semibold'>Type: </span>
                                <span className='capitalize'>{product?.variant}</span>
                            </p>
                        </div>
                    </div>
                    <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
                        <NotebookTabs size={25} className="text-gray-500" />
                        <div>
                            <p className="text-base text-gray-500">
                                <span className='font-semibold'>Stock: </span>
                                <span>{product?.stock && <span className='font-semibold tracking-wide'>{product?.stock ? 'Available' : 'Out of Stock'}</span>}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default ProductAttributes;
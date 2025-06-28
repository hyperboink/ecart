import React from 'react';
import Logo from './Logo';
import Social from './Social';
import { SmallText, SubHeading } from './ui/text';
import Link from 'next/link';
import { categoriesData, quickLinksData } from '@/app/constants/data';
import { Input } from './ui/input';
import { Button } from './ui/button';

const FooterBottom = () => {
  return (
    <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div className='space-y-4'>
            <Logo />

            <SmallText>Smart devices, innovative tools, and must-have tech—all in one place, made for modern living.</SmallText>

            <Social className='text-black/60' iconClassName='hover:bg-primary-main hover:text-white hover-transition' tooltipClassName='bg-black/80 text-white'/>
        </div>

        <div>
            <SubHeading>Quick Links</SubHeading>

            <ul className='space-y-3 mt-4'>
                {quickLinksData.map((link, index) => (
                        <li key={index}>
                        <Link href={link.href} className=' text-gray-600 hover:text-primary-main hover-transition'>{link.title}</Link>
                    </li>
                ))}
                
            </ul>
        </div>

        <div>
            <SubHeading>Categories</SubHeading>

            <ul className='space-y-3 mt-4'>
                {categoriesData.map((category, index) => (
                    <li key={index}>
                        <Link href={category.href} className='text-gray-600 hover:text-primary-main hover-transition'>{category.title}</Link>
                    </li>
                ))}
            
            </ul>
        </div>

        <div className='space-y-4'>
            <SubHeading>Newsletter</SubHeading>

            <SmallText>Subscribe to our newsletter to receive updates and exclusive offers.</SmallText>

            <form className='space-y-3'>
                <Input placeholder="Enter your email" type="email" required/>

                <Button className='w-full'>Subscribe</Button>
            </form>
        </div>
    </div>
  )
}

export default FooterBottom
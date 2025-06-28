import React from 'react';
import { Heading } from './ui/text';
import { getLatestBlog } from '@/sanity/queries';
import { Blog } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { Calendar, Newspaper } from 'lucide-react';
import dayjs from 'dayjs';

const LatestBlog = async () => {
    const blogs = await getLatestBlog();

    return (
        <div className='my-10'>
            <Heading icon={Newspaper}>Blog</Heading>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
                {blogs.map((blog: Blog) => (
                    <div key={blog?._id} className='rounded-sm overflow-hidden'>
                        {blog?.mainImage && (
                            <Link href={`/blog/${blog?.slug?.current}`}>
                                <Image
                                    src={urlFor(blog?.mainImage).url()}
                                    alt=''
                                    width={500}
                                    height={500}
                                    className='w-full max-h-80 object-cover'/>
                            </Link>
                        )}

                        <div className='bg-gray-100 p-5'>
                            <div className='text-xs flex items-center gap-4'>
                                <div className='flex items-center relative group cursor-pointer'>
                                    {blog?.blogcategories?.map((item, index) => (
                                        <p
                                            key={index}
                                            className='font-semibold tracking-wider text-primary-main'
                                        >
                                            {item?.title}
                                        </p>
                                    ))}

                                    <span className='absolute left-0 -bottom-1.5 bg-primary-dark/40 inline-block w-full h-[2px] group-hover:bg-primary-dark hover:cursor-pointer hover-transition'></span>
                                </div>

                                <p className='flex items-center gap-1 relative group text-gray-500 hover:text-black hover-transition'>
                                    <Calendar size={15} />
                                    {dayjs(blog.publishedAt).format('MMMM D, YYYY')}
                                    <span className='absolute left-0 -bottom-1.5 bg-gray-500/40 inline-block w-full h-[2px] group-hover:bg-gray-500 hover:cursor-pointer hover-transition'></span>
                                </p>
                            </div>

                            <Link
                                href={`/blog/${blog?.slug?.current}`}
                                className='text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-primary-main hover-transition'
                            >
                                {blog?.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestBlog;

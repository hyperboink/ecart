import Container from "@/components/Container";
import { Heading } from "@/components/ui/text";
import { Blog } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
    const blogs = await getAllBlogs(6);

    return (
        <div className="pt-10 pb-20 bg-white">
            <Container>
                <Heading icon={Newspaper}>Blog</Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {blogs?.map((blog: Blog) => (
                        <div
                            key={blog?._id}
                            className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group"
                        >
                            {blog?.mainImage && (
                                <Link href={`/blog/${blog?.slug?.current}`}>
                                    <Image
                                        src={urlFor(blog.mainImage).url()}
                                        alt={blog?.title || "Blog image"}
                                        width={500}
                                        height={300}
                                        className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </Link>
                            )}

                            <div className="p-6 flex flex-col gap-4">
                                <div className="text-xs text-gray-500 flex items-center gap-4 flex-wrap">
                                    {blog?.blogcategories?.map((item, i) => (
                                        <span
                                            key={i}
                                            className="uppercase font-semibold text-primary-main tracking-wider"
                                        >
                                            {item?.title}
                                        </span>
                                    ))}
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <Calendar size={14} />
                                        {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                                    </span>
                                </div>

                                <Link
                                    href={`/blog/${blog?.slug?.current}`}
                                    className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-primary-main transition-colors"
                                >
                                    {blog.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default BlogPage;

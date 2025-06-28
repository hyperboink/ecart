import { sanityFetch } from "../lib/live";
import { queryFetch } from "./utils";
import {
    BLOG_CATEGORIES,
    BRANDS_QUERY,
    GET_ALL_BLOG,
    LATEST_BLOG_QUERY,
    MY_ORDERS_QUERY,
    OTHERS_BLOG_QUERY,
    PRODUCTS_QUERY,
    PRODUCT_BRAND_QUERY,
    PRODUCT_BY_SLUG_QUERY,
    SINGLE_BLOG_QUERY,
    SPECIAL_DEAL_PRODUCTS_QUERY
} from "./query";

const getCategories = async(quantity?: number) => {
    try{
      const query = quantity
        ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
            ...,
            "productCount": count(*[_type == "product" && references(^._id)])
          }`
        : `*[_type == 'category'] | order(name asc) {
            ...,
            "productCount": count(*[_type == "product" && references(^._id)])
          }`;
      const { data } = await sanityFetch({
        query,
        params: quantity ? { quantity } : {},
      });
      return data;
    }catch(error){
      console.log("Error:", error);
      return [];
    }
};

const getAllBrands = async() => queryFetch(BRANDS_QUERY);

const getLatestBlog = async() => queryFetch(LATEST_BLOG_QUERY);

const getSpecialDealProducts = async() => queryFetch(SPECIAL_DEAL_PRODUCTS_QUERY);

const getAllProducts = async() => queryFetch(PRODUCTS_QUERY);

const getProductBySlug = async(slug: string) => queryFetch(PRODUCT_BY_SLUG_QUERY, { slug }, null);

const getProductBrand = async(slug: string) => queryFetch(PRODUCT_BRAND_QUERY, { slug }, null);

const getMyOrders = async(userId: string) => queryFetch(MY_ORDERS_QUERY, { userId }, null);

const getAllBlogs = async(quantity: number) => queryFetch(GET_ALL_BLOG, { quantity });

const getSingleBlog = async(slug: string) => queryFetch(SINGLE_BLOG_QUERY, { slug });

const getBlogCategories = async() => queryFetch(BLOG_CATEGORIES);

const getOthersBlog = async(slug: string, quantity: number) => queryFetch(OTHERS_BLOG_QUERY, { slug, quantity });

export {
    getCategories,
    getAllBrands,
    getLatestBlog,
    getSpecialDealProducts,
    getAllProducts,
    getProductBySlug,
    getProductBrand,
    getMyOrders,
    getAllBlogs,
    getSingleBlog,
    getBlogCategories,
    getOthersBlog,
}
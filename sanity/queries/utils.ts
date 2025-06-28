import { sanityFetch } from "../lib/live";

type ParamProps =  {
    slug?: string;
    userId?: string;
    quantity?: number;
}

export const queryFetch = async(query: string, params?: ParamProps, fallback?: []|null, options?: { next?: { revalidate?: number } } ) => {
    try{
        const { data } = await sanityFetch({ query, params, options });
        return data || fallback || [];
    }catch(error){
        console.log('Error:', error);
        return fallback || null;
    }
}
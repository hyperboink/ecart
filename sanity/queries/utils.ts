import { sanityFetch } from "../lib/live";

type ParamProps =  {
    slug?: string;
    userId?: string;
    quantity?: number;
}

export const queryFetch = async(query: string, params?: ParamProps, fallback?: []|null ) => {
    try{
        const { data } = await sanityFetch({ query, params });
        return data || fallback || [];
    }catch(error){
        console.log('Error:', error);
        return fallback || null;
    }
}
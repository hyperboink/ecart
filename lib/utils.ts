import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { clsx, type ClassValue } from "clsx"
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchProduct(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setProducts: Dispatch<SetStateAction<Product[]>>,
  query: string,
  params: { variant: string },
) {
  setLoading(true);
  try{
      const res = await client.fetch(query, params);
      setProducts(res);
  }catch(error){
      console.log('Product fetching error:', error);
  }finally{
      setLoading(false);
  }
}
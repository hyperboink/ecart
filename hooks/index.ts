import { useEffect, useRef, useState } from "react";

export function useOuterClick<T extends HTMLElement>(callback: () => void) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleOuterClick = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target as Node)){
                callback();
            }
        }

        document.addEventListener('mousedown', handleOuterClick);

        return () => {
            document.removeEventListener('mousedown', handleOuterClick);
        }
    }, [callback]);

    return ref;
}

export function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
  
      return () => clearTimeout(handler);
    }, [value, delay]);
  
    return debouncedValue;
  }
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './sanity.types';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface StoreState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    deleteCartProduct: (productId: string) => void;
    resetCart: () => void;
    getTotalPrice: () => number;
    getSubTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => CartItem[];
    // WishList
    wishListProducts: Product[];
    addToWishList: (product: Product) => Promise<void>;
    removeFromWishList: (productId: string) => void;
    resetWishList: () => void;
}

const useStore = create<StoreState>()(
    persist((set, get) => ({
        // Cart
        items: [],
        addItem: (product) =>
            set((state) => {
                const existingItem = state.items.find((item) => item.product._id === product._id);

                if(existingItem){
                    return {
                        items: state.items.map((item) =>
                        item.product._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        ),
                    };
                }else{
                    return { items: [...state.items, { product, quantity: 1 }] };
                }
            }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.reduce((acc, item) => {
                        if(item.product._id === productId){
                            if(item.quantity > 1){
                                acc.push({ ...item, quantity: item.quantity - 1 });
                            }
                        }else{
                            acc.push(item);
                        }

                        return acc;
                    }, [] as CartItem[]),
            })),
            deleteCartProduct: (productId) =>
                set((state) => ({
                    items: state.items.filter(({ product }) => product?._id !== productId),
            })),
            resetCart: () => set({ items: [] }),
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
            },
            getSubTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = item.product.price ?? 0;
                    const discount = ((item.product.discount ?? 0) * price) / 100;
                    const discountedPrice = price + discount;

                    return total + discountedPrice * item.quantity;
                }, 0);
            },
            getItemCount: (productId) => {
                const item = get().items.find((item) => item.product._id === productId);

                return item ? item.quantity : 0;
            },
            getGroupedItems: () => get().items,

            // WishList
            wishListProducts: [],
            addToWishList: (product: Product) => {
                return new Promise<void>((resolve) => {
                    set((state: StoreState) => {
                        const isWishListed = state.wishListProducts.some((item) => item._id === product._id);

                        return {
                            wishListProducts: isWishListed
                                ? state.wishListProducts.filter((item) => item._id !== product._id)
                                : [...state.wishListProducts, { ...product }],
                        };
                    });

                    resolve();
                });
            },
            removeFromWishList: (productId: string) => {
                set((state: StoreState) => ({
                    wishListProducts: state.wishListProducts.filter((item) => item?._id !== productId),
                }));
            },
            resetWishList: () => {
                set({ wishListProducts: [] });
            },
    }), {
        name: 'ecart-store'
    })
);

export default useStore;
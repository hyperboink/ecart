    'use client';

    import React, { useEffect, useState } from 'react';
    import useStore from '@/store';
    import { useAuth, useUser } from '@clerk/nextjs';
    import { Address } from '@/sanity.types';
    import { ShoppingBag, Trash2 } from 'lucide-react';
    import { Heading } from '../ui/text';
    import Link from 'next/link';
    import Image from 'next/image';
    import { urlFor } from '@/sanity/lib/image';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
    import toast from 'react-hot-toast';
    import { Button } from '../ui/button';
    import { Separator } from '../ui/separator';
    import { client } from '@/sanity/lib/client';
    import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
    import { RadioGroup } from '@radix-ui/react-radio-group';
    import { RadioGroupItem } from '../ui/radio-group';
    import { Label } from '../ui/label';
    import Container from '../Container';
    import Login from '../Login';
    import AddToWishListButton from '../wishlist/AddToWishListButton';
    import CurrencyFormat from '../CurrencyFormat';
    import QuantityButton from '../product/QuantityButton';
    import EmptyBlock from '../EmptyBlock';
    import { Metadata, createCheckoutSession } from '@/actions/createSessionCheckout';
import { ALL_ADDRESS_QUERY } from '@/sanity/queries/query';

    const Cart = () => {
    const {
        deleteCartProduct,
        getTotalPrice,
        getItemCount,
        getSubTotalPrice,
        resetCart,
    } = useStore();
    const groupedItems = useStore((state) => state.getGroupedItems());

    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const [addresses, setAddresses] = useState<Address[] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [loading, setLoading] = useState(false);

    const [newAddress, setNewAddress] = useState<Partial<Address>>({});
    const [addingNew, setAddingNew] = useState(false);

    const fetchAddress = async () => {
        setLoading(true);

        try {
            const data = await client.fetch(ALL_ADDRESS_QUERY);
            setAddresses(data);
            const defaultAddress = data.find((addr: Address) => addr.default);

            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            } else if (data.length > 0) {
                setSelectedAddress(data[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const handleResetCart = () => {
        if (window.confirm('This will clear your cart. Proceed?')) {
        resetCart();
        toast.success('Cart reset successfully.');
        }
    };

    const handleCheckout = async () => {
        setLoading(true);

        try {
        const metadata: Metadata = {
            orderNumber: crypto.randomUUID(),
            customerName: user?.fullName ?? 'Unknown',
            customerEmail: user?.emailAddresses[0]?.emailAddress ?? 'Unknown',
            clerkUserId: user?.id ?? '',
            address: selectedAddress,
        };

        const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        {isSignedIn ? (
            <Container>
            {groupedItems?.length ? (
                <div className="pb-20 space-y-6">
                <div className="flex items-center gap-2 pt-10 pb-1">
                    <ShoppingBag className="w-6 h-6 text-primary-main" />
                    <Heading className="text-xl font-bold">Your Cart</Heading>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                    <Card className="bg-white border shadow-xs py-0">
                        <CardContent className="p-0 relative">
                        {groupedItems.map(({ product }) => {
                            const itemCount = getItemCount(product._id);
                            return (
                            <div key={product._id} className="flex items-center justify-between p-4 border-b last:border-b-0 relative">
                                <div className="flex gap-4 flex-1">
                                {product?.images && (
                                    <Link href={`/product/${product?.slug?.current}`} className='border rounded-md'>
                                    <Image
                                        src={urlFor(product.images[0]).url()}
                                        alt={product.name as string}
                                        width={120}
                                        height={120}
                                        className="w-28 h-28 rounded-md object-cover transition-transform hover:scale-105"
                                    />
                                    </Link>
                                )}

                                <div className="flex flex-col space-y-1 py-1 text-sm">
                                    <h3 className="font-semibold text-base">{product.name}</h3>
                                    <p className='text-sm text-gray-500 mt-0.5'><span>Variant:</span> <span className="font-medium capitalize">{product.variant}</span></p>
                                    <p className='text-sm text-gray-500 mt-0.5'>
                                    <span className={`font-medium capitalize inline-block border rounded-full px-2 ${product.status == 'hot' && 'text-red-700 border-red-700'} ${product.status == 'sale' && 'text-primary-main border-primary-main'}`}>{product.status}</span>
                                    </p>

                                    <div className="flex items-center gap-2 mt-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                        <TooltipTrigger>
                                            <AddToWishListButton product={product} className='relative top-0 right-0 bg-gray-500/50 rounded-full text-white' />
                                        </TooltipTrigger>
                                        <TooltipContent>Wishlist</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                        <TooltipTrigger>
                                            <Trash2
                                            onClick={() => {
                                                deleteCartProduct(product._id);
                                                toast.success('Removed from cart.');
                                            }}
                                            className="text-gray-500 hover:text-red-600 cursor-pointer w-5 h-5"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>Remove</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    </div>
                                </div>
                                </div>

                                <div className="flex flex-col items-end justify-between h-full">
                                <CurrencyFormat amount={(product.price as number) * itemCount} className="font-semibold text-gray-700" />
                                <QuantityButton product={product} className='mt-2' />
                                </div>
                            </div>
                            );
                        })}
                        </CardContent>
                    </Card>

                    <div className='text-right'>
                        <Button onClick={handleResetCart} variant='outline' className="w-full md:w-fit rounded-full">
                        Reset Cart
                        </Button>
                    </div>
                    </div>

                    <div className="space-y-6">
                    <Card className="bg-white border shadow-xs">
                        <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <CurrencyFormat amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Discount</span>
                            <CurrencyFormat amount={getSubTotalPrice() - getTotalPrice()} />
                        </div>
                        <Separator />
                        <div className="flex justify-between text-base font-semibold">
                            <span>Total</span>
                            <CurrencyFormat amount={getTotalPrice()} />
                        </div>
                        <Button size="lg" className="w-full rounded-full" disabled={loading} onClick={handleCheckout}>
                            {loading ? 'Please wait...' : 'Proceed to Checkout'}
                        </Button>
                        </CardContent>
                    </Card>

                    {addresses && (
                        <Card className='bg-white border shadow-xs'>
                            <CardHeader>
                                <CardTitle>Select Delivery Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    value={selectedAddress?._id}
                                    onValueChange={(id) => {
                                        const matched = addresses.find((a) => a._id === id);
                                        if (matched) setSelectedAddress(matched);
                                    }}
                                    >
                                {addresses?.map((address) => (
                                    <div
                                    key={address._id}
                                    className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                                        selectedAddress?._id === address._id ? 'text-primary-main' : ''
                                    }`}
                                    >
                                    <RadioGroupItem id={`address-${address._id}`} value={address._id} />
                                    <Label htmlFor={`address-${address._id}`} className="grid gap-1.5 flex-1 cursor-pointer">
                                        <span className="font-semibold">{address.name}</span>
                                        <span className="text-sm text-black/60">
                                        {address.address}, {address.city}, {address.state} {address.zip}
                                        </span>
                                    </Label>
                                    </div>
                                ))}
                                </RadioGroup>

                                {addingNew ? (
                                    <div className="space-y-2 mt-4">
                                        <input placeholder="Type of Address" className="w-full border px-3 py-2 rounded text-sm" onChange={(e) => setNewAddress((prev) => ({ ...prev, name: e.target.value }))} />
                                        <input placeholder="Street Address" className="w-full border px-3 py-2 rounded text-sm" onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))} />
                                        <input placeholder="City" className="w-full border px-3 py-2 rounded text-sm" onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))} />
                                        <input placeholder="State" className="w-full border px-3 py-2 rounded text-sm" onChange={(e) => setNewAddress((prev) => ({ ...prev, state: e.target.value }))} />
                                        <input placeholder="ZIP" className="w-full border px-3 py-2 rounded text-sm" onChange={(e) => setNewAddress((prev) => ({ ...prev, zip: e.target.value }))} />
                                        
                                        <div className="flex gap-2">
                                            <Button
                                                className="w-2/3"
                                                onClick={() => {
                                                const temp: Address = {
                                                    ...newAddress,
                                                    _id: crypto.randomUUID(),
                                                    _type: 'address',
                                                    default: false,
                                                    publishedAt: new Date().toISOString(),
                                                } as Address;

                                                setAddresses((prev) => [...(prev || []), temp]);
                                                setSelectedAddress(temp);
                                                setAddingNew(false);
                                                setNewAddress({});
                                                }}
                                            >
                                                Save Address
                                            </Button>

                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => {
                                                setAddingNew(false);
                                                setNewAddress({});
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                    ) : (
                                    <Button variant="outline" className="w-full mt-4 rounded-full" onClick={() => setAddingNew(true)}>
                                        Add New Address
                                    </Button>
                                    )}
                            </CardContent>
                        </Card>
                    )}
                    </div>
                </div>
                </div>
            ) : (
                <EmptyBlock title='Your cart is empty' content='You haven’t picked anything yet. Start exploring our products!' icon={ShoppingBag} />
            )}
            </Container>
        ) : (
            <Login />
        )}
        </div>
    );
    };

    export default Cart;

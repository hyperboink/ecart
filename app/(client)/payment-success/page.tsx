'use client';

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/Loader";

const SuccessPageContent = () => {
    const { resetCart } = useStore();
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");

    useEffect(() => {
        if (orderNumber) {
            resetCart();
        }
    }, [orderNumber, resetCart]);

    return (
        <div className="py-20 md:py-50 bg-gradient-to-tr from-violet-100 via-white to-violet-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl p-8 text-center border border-gray-200"
            >
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-16 h-16 text-violet-600" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Order Confirmed
                </h1>
                <p className="text-gray-600 mb-4">
                    Thank you for your purchase. Your order is being processed and prepared for shipment.
                </p>
                {orderNumber && (
                    <p className="text-sm mb-6">
                        Order Number:<br /> <span className="font-medium text-gray-500">{orderNumber}</span>
                    </p>
                )}

                <div className="flex flex-col gap-3">
                    <Link
                        href="/orders"
                        className="w-full font-semibold text-center px-6 py-3 border rounded-full hover:bg-gray-100 hover-transition"
                        >
                        Check My Orders
                    </Link>
                    <Link
                        href="/"
                        className="w-full font-semibold text-center px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

const PaymentSuccessPage = () => {
    return (
        <Suspense fallback={<Loader />}>
            <SuccessPageContent />
        </Suspense>
    );
};

export default PaymentSuccessPage;

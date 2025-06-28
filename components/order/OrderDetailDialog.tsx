import React from "react";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "../ui/dialog";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CurrencyFormat from "../CurrencyFormat";
import { FileDown } from "lucide-react";

interface OrderDetailsDialogProps {
    order?: MY_ORDERS_QUERYResult[number] | null;
    isOpen: boolean;
    onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
    order,
    isOpen,
    onClose
}) => {
    if (!order) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto px-8 py-10 rounded-xl bg-white shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 mb-6">
                        Order #{order.orderNumber}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-8">
                    <div>
                        <span className="text-gray-500 block mb-1">Customer</span>
                        {order.customerName}
                    </div>
                    <div>
                        <span className="text-gray-500 block mb-1">Email</span>
                        {order.email}
                    </div>
                    <div>
                        <span className="text-gray-500 block mb-1">Date</span>
                        {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <div>
                        <span className="text-gray-500 block mb-1">Status</span>
                        <span className="capitalize font-medium text-green-600">
                            {order.status}
                        </span>
                    </div>
                    <div className="sm:col-span-2">
                        <span className="text-gray-500 block mb-1">Invoice</span>
                        {order?.invoice?.number || "—"}
                        {order?.invoice?.hosted_invoice_url && (
                            <Link
                                href={order.invoice.hosted_invoice_url}
                                target="_blank"
                                className="ml-4 text-primary text-sm font-medium inline-flex items-center gap-1 hover:underline"
                            >
                                <FileDown size={14} /> Download
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Products</h3>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50 text-gray-600 text-sm">
                                <TableRow>
                                    <TableHead className="px-6 py-3">Product</TableHead>
                                    <TableHead className="px-6 py-3">Qty</TableHead>
                                    <TableHead className="px-6 py-3">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.products?.map((product, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-50">
                                        <TableCell className="px-6 py-4 flex items-center gap-3">
                                            {product?.product?.images?.[0] && (
                                                <Image
                                                    src={urlFor(product.product.images[0]).url()}
                                                    alt="product"
                                                    width={40}
                                                    height={40}
                                                    className="rounded border w-10 h-10 object-contain"
                                                />
                                            )}
                                            <span className="text-sm text-gray-800">
                                                {product?.product?.name}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            {product?.quantity}
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <CurrencyFormat
                                                amount={product?.product?.price}
                                                className="text-gray-900 font-medium"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <div className="w-full sm:w-1/3 space-y-2 text-sm">
                        {order?.amountDiscount !== 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Discount</span>
                                <CurrencyFormat
                                    amount={order.amountDiscount}
                                    className="text-gray-800"
                                />
                            </div>
                        )}
                        {order?.amountDiscount !== 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <CurrencyFormat
                                    amount={(order.totalPrice || 0) + (order.amountDiscount || 0)}
                                    className="text-gray-800"
                                />
                            </div>
                        )}
                        <hr className="my-2 border-gray-200" />
                        <div className="flex justify-between font-semibold text-gray-900 text-base">
                            <span>Total</span>
                            <CurrencyFormat amount={order.totalPrice} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailDialog;

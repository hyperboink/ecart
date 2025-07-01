export const dynamic = 'force-dynamic';

import React from "react";
import Container from "@/components/Container";
import OrderEmpty from "@/components/order/OrderEmpty";
import Orders from "@/components/order/Orders";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Logs } from "lucide-react";
import { Heading } from "@/components/ui/text";

const OrdersPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);

    return (
        <div>
            <Container className="py-10">
                <Heading icon={Logs} className="mb-5">Orders</Heading>

                {orders?.length ? (
                    <Card className="w-full">
                        <CardContent>
                            <ScrollArea>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] md:w-auto">
                                    Order Number
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                    Date
                                    </TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                    Email
                                    </TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                    Invoice Number
                                    </TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                                </TableHeader>
                                <Orders orders={orders} />
                            </Table>
                            <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                ) : (
                    <OrderEmpty />
                )
                }
            </Container>
        </div>
    );
};

export default OrdersPage;
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    amount: number | undefined,
    currency?: string,
    className?: string
}

const CurrencyFormat = ({ amount, currency, className }: Props) => {
    const formattedPrice = new Number(amount).toLocaleString('en-US', {
        currency: currency || 'USD',
        style: 'currency',
        minimumFractionDigits : 2,
    });

    return (
        <span className={cn('font-semibold', className)}>{formattedPrice}</span>
    )
}

export default CurrencyFormat;
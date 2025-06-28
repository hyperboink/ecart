import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

export const socialData = [
    {
        title: 'Facebook',
        href: '#',
        icon: <Facebook className='w-5 h-5' />,
    },
    {
        title: 'Twitter',
        href: '#',
        icon: <Twitter className='w-5 h-5'/>,
    },
    {
        title: 'Instagram',
        href: '#',
        icon: <Instagram className='w-5 h-5'/>,
    },
    {
        title: 'Youtube',
        href: '#',
        icon: <Youtube className='w-5 h-5'/>,
    }
];

const Social = ({
    className,
    iconClassName,
    tooltipClassName
}: Props) => {
    
  return (
    <TooltipProvider>
        <div className={cn('flex item0-center gap-3.5', className)}>
            {socialData.map((social) => (
                <Tooltip key={social.title}>
                    <TooltipTrigger asChild>
                        <Link 
                            href={social.href} 
                            className={cn('p-2 border rounded-full', iconClassName)}
                            target='_blank'
                            rel='noopener noreferrer'
                        >{social.icon}</Link>
                    </TooltipTrigger>
                    <TooltipContent className={cn('text-black bg-white px-2 rounded-sm', tooltipClassName)}>
                        {social.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </TooltipProvider>
  )
}

export default Social
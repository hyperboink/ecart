import { cn } from "@/lib/utils";

export const Heading = ({ children, className, icon: Icon = () => null }: { children: React.ReactNode, className?: string, icon?: React.ElementType }) => {
    return <h2 className={cn('text-xl font-bold flex items-center gap-2', className)}>
        {Icon && (
            <Icon className='text-primary-main' />
        )}
        {children}
    </h2>
}



export const SubHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <h3 className={cn('font-semibold text-gray-600 font-sans', className)}>{children}</h3>
}

export const SmallText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <p className={cn('text-gray-600 text-sm', className)}>{children}</p>
}
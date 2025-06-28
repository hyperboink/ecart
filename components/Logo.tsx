import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className }: { className ?: string }) => {
  return (
    <Link href={'/'} className={cn('font-black text-2xl text-primary-dark inline-flex', className)}>ECart</Link>
  )
}

export default Logo
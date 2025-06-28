import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
    className?: string;
}

export default function Loader({ className }: Props) {
  return (
    <div className={cn('p-20 flex flex-col gap-2 min-h-190 items-center justify-center bg-white', className)}>
        <Loader2 className='w-10 h-10 animate-spin' />
    </div>
  )
}
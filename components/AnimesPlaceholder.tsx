import { Skeleton } from "@/components/ui/skeleton";

export default function AnimesPlaceholder() {
  return (
    <div className="container pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4">
      <Skeleton className="w-full h-[266px] rounded-lg" />
      <Skeleton className="w-full h-[266px] rounded-lg" />
      <Skeleton className="w-full h-[266px] rounded-lg" />
      <Skeleton className="w-full h-[266px] rounded-lg" />
    </div>
  )
}

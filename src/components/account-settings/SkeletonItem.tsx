import { LucideIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
interface SkeletonItemProps {
  icon?: LucideIcon;
  className?: string;
}

export default function SkeletonItem({
  icon: Icon,
  className,
}: SkeletonItemProps) {
  return (
    <div className={`flex flex-col gap-1 text-sm ${className}`}>
      <div className="flex items-center gap-2 rounded-md p-1.5 font-medium">
        <Skeleton className="h-4 w-24" />
        {Icon && <Icon size={16} className="opacity-50" />}
      </div>
      <Skeleton className="h-14 w-full rounded-md" />
    </div>
  );
}

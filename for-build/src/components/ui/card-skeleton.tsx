import { Skeleton } from "./skeleton";

interface CardSkeletonProps {
  imageHeight?: string;
}

export function CardSkeleton({ imageHeight = "h-48" }: CardSkeletonProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Skeleton className={`w-full ${imageHeight}`} />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

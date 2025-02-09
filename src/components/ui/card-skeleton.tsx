import { Card } from "./card";
import { Skeleton } from "./skeleton";

interface CardSkeletonProps {
  hasImage?: boolean;
  hasActions?: boolean;
  imageHeight?: string;
}

export function CardSkeleton({
  hasImage = true,
  hasActions = true,
  imageHeight = "h-48",
}: CardSkeletonProps) {
  return (
    <Card className="overflow-hidden">
      {hasImage && (
        <Skeleton className={`w-full ${imageHeight} rounded-none`} />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
          {hasActions && <Skeleton className="h-8 w-8 rounded-full" />}
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
      </div>
    </Card>
  );
}

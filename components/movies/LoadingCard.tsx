import DotSpacer from "../DotSpacer";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shrink-0">
      <Skeleton className="w-screen h-45 bg-primary-900" />
      <div className="text-white pt-1.5">
        <Skeleton className="h-8 w-full bg-primary-900" />
      </div>
    </div>
  );
};

export default LoadingCard;

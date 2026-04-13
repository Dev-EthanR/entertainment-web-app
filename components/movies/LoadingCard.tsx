import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="relative w-full h-full rounded-lg overflow-hidden shrink-0 bg-transparent">
      <Skeleton className="w-screen h-40 bg-primary-900" />
      <CardContent className="text-white p-0">
        <Skeleton className="h-8 w-full bg-primary-900" />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;

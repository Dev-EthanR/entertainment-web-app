import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadTrending = () => {
  return (
    <Card className="min-w-60 lg:min-w-117.5 h-35 lg:h-50 rounded-lg overflow-hidden bg-primary-900">
      <CardContent>
        <Skeleton className="aspect-video w-full bg-primary-900" />
      </CardContent>
    </Card>
  );
};

export default LoadTrending;

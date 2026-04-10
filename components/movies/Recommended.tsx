"use client";
import { useRecommendation } from "@/hooks/useRecommendation";
import { getRelease } from "@/utils/getRelease";
import { getTitle } from "@/utils/getTitle";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";
import Card from "./Card";
import LoadingCard from "./LoadingCard";

const Recommended = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useRecommendation();
  const recommendations = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );
  if (status === "error") return alert("Error fetching data");

  return (
    <>
      <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
        Recommended for you
      </h2>
      {status === "pending" && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:ml-6 ">
          {Array.from({ length: 20 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      )}
      {status === "success" && (
        <InfiniteScrollContainer
          onBottomReach={() => hasNextPage && !isFetching && fetchNextPage()}
          style="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:ml-6 "
        >
          {recommendations?.map((item) => (
            <Card
              key={`${item.id}-${item.type}`}
              title={getTitle(item)}
              image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              date={getRelease(item)}
              type={item.type!}
              language={item.original_language}
            />
          ))}
        </InfiniteScrollContainer>
      )}
      {isFetchingNextPage && <Spinner className="mx-auto size-6" />}
    </>
  );
};

export default Recommended;

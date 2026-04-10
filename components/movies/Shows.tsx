"use client";
import { useShows } from "@/hooks/useShows";
import Card from "./Card";
import LoadingCard from "./LoadingCard";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";

const Shows = () => {
  const {
    data,
    status,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useShows();
  const shows = data?.pages.flatMap((page) => page.results);

  if (status === "error") return <p>Error fetching data</p>;
  return (
    <>
      <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
        TV Series
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
          {shows &&
            shows.length > 0 &&
            shows?.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                date={item.first_air_date}
                type={"tv"}
                language={item.original_language}
              />
            ))}
        </InfiniteScrollContainer>
      )}
      {isFetchingNextPage && <Spinner />}
    </>
  );
};

export default Shows;

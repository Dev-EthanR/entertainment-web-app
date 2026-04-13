"use client";
import { useMovies } from "@/hooks/useMovies";
import Card from "./Card";
import LoadingCard from "./LoadingCard";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";
import { useBookmark } from "@/hooks/useBookmark";
import { checkBookmark } from "@/utils/checkBookmarks";

const Movies = () => {
  const {
    data,
    status,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useMovies();
  const { data: bookmarks } = useBookmark();
  if (status === "error") return <p>Error fetching data</p>;

  const movies = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );

  const moviesData = checkBookmark(movies, bookmarks ?? []);
  return (
    <>
      <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
        Movies
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
          {moviesData &&
            moviesData.length > 0 &&
            moviesData?.map((item) => (
              <Card
                key={item.id}
                details={item}
                type={"movie"}
                bookmarked={item.isBookmarked}
                bookmarkId={item.bookmarkId || ""}
              />
            ))}
        </InfiniteScrollContainer>
      )}
      {isFetchingNextPage && <Spinner className="mx-auto size-6" />}
    </>
  );
};

export default Movies;

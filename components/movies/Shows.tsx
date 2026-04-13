"use client";
import { useShows } from "@/hooks/useShows";
import Card from "./Card";
import LoadingCard from "./LoadingCard";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";
import { useBookmark } from "@/hooks/useBookmark";
import { checkBookmark } from "@/utils/checkBookmarks";

const Shows = () => {
  const {
    data,
    status,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useShows();
  const { data: bookmarks } = useBookmark();
  if (status === "error") return <p>Error fetching data</p>;

  const shows = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );
  const showsData = checkBookmark(shows, bookmarks ?? []);

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
          {showsData &&
            showsData.length > 0 &&
            showsData?.map((item) => (
              <Card
                key={item.id}
                type={"tv"}
                details={item}
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

export default Shows;

"use client";
import { useBookmark } from "@/hooks/useBookmark";
import { useSearch } from "@/hooks/useSearch";
import { checkBookmark } from "@/utils/checkBookmarks";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Spinner } from "../ui/spinner";
import Card from "./Card";
import LoadingCard from "./LoadingCard";

interface Props {
  searchParams: string;
  type: "all" | "movie" | "series";
}

const SearchResults = ({ searchParams, type }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useSearch(searchParams, type);

  const searchResult = Array.from(
    new Map(
      data?.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );
  const totalResults = data?.pages.reduce(
    (acc, page) => acc + page.total_results,
    0,
  );
  const { data: bookmarks } = useBookmark();
  const newData = checkBookmark(searchResult, bookmarks ?? []);

  if (status === "error") return <p>Error fetching data</p>;

  return (
    <>
      <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
        Found <span>{totalResults} </span> results for &apos;
        <span>{searchParams}</span>
        &apos;
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
          {newData?.map((item) => (
            <Card
              key={`${item.id}-${item.type}`}
              type={item.type!}
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

export default SearchResults;

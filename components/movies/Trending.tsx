"use client";
import { useTrending } from "@/hooks/useTrending";
import LoadTrending from "./LoadTrending";
import TrendingCard from "./TrendingCard";
import { useBookmark } from "@/hooks/useBookmark";
import { checkBookmark } from "@/utils/checkBookmarks";

const Trending = () => {
  const { data, status } = useTrending();
  const { data: bookmarks } = useBookmark();
  if (status === "error") return <p>Error fetching data</p>;

  const newData = checkBookmark(data ?? [], bookmarks ?? []);

  return (
    <>
      <h2 className="text-white ml-4 lg:ml-6 text-[20px] md:text-[32px] font-light">
        Trending
      </h2>
      {status === "pending" && (
        <div className="flex gap-4 p-4 max-w-full overflow-hidden lg:ml-2.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <LoadTrending key={index} />
          ))}
        </div>
      )}
      {status === "success" && (
        <div className="flex gap-4 p-4 max-w-full overflow-x-auto scrollbar-theme lg:ml-2.5">
          {newData?.map((item) => (
            <TrendingCard
              key={item.id}
              type={"title" in item ? "movie" : "tv"}
              details={item}
              bookmarked={item.isBookmarked}
              bookmarkId={item.bookmarkId || ""}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Trending;

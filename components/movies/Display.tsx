"use client";
import LoadTrending from "./LoadTrending";
import TrendingCard from "./TrendingCard";
import { Data, useTrending } from "@/hooks/useTrending";

const Display = () => {
  const { data, status } = useTrending();

  const getTitle = (item: Data) => ("title" in item ? item.title : item.name);
  const getRelease = (item: Data) =>
    "release_date" in item ? item.release_date : item.first_air_date;

  if (status === "error") return <p>Error fetching data</p>;

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
          {data?.map((movie) => (
            <TrendingCard
              key={movie.id}
              title={getTitle(movie)}
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              date={getRelease(movie)}
              type={"title" in movie ? "movie" : "tv"}
              language={movie.original_language}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Display;

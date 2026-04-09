"use client";
import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { useQuery } from "@tanstack/react-query";
import TrendingCard from "./TrendingCard";

type Data = Movie | Series;

const Display = () => {
  const { data } = useQuery({
    queryKey: ["trending"],
    queryFn: async (): Promise<Data[]> => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY2}`,
      );
      return res.json().then((data) => data.results);
    },
  });
  const getTitle = (item: Data) => ("title" in item ? item.title : item.name);
  const getRelease = (item: Data) =>
    "release_date" in item ? item.release_date : item.first_air_date;

  return (
    <>
      <h2 className="text-white ml-4 lg:ml-6 text-[20px] md:text-[32px] font-light">
        Trending
      </h2>
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
    </>
  );
};

export default Display;

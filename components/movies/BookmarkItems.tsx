"use client";
import Card from "./Card";
import { useBookmark } from "@/hooks/useBookmark";
import LoadingCard from "./LoadingCard";

const BookmarkItems = () => {
  const { data, status } = useBookmark();

  if (status === "error") return <p>Error fetching data</p>;
  if (data?.length === 0)
    return <p className="text-white text-5xl">No bookmarks</p>;
  const movies = data?.filter((item) => item.mediaType === "movie");
  const shows = data?.filter((item) => item.mediaType === "tv");

  if (status === "pending") {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:ml-6 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {movies?.length && (
        <>
          <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
            Bookmarked Movies
          </h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:ml-6 ">
            {movies?.map((item) => (
              <Card
                key={item.id}
                type={"movie"}
                details={{
                  backdrop_path: item.backdropImage,
                  first_air_date: item.release,
                  genre_ids: item.genreId,
                  name: item.title,
                  origin_country: item.originCountry,
                  original_language: item.language,
                  original_name: item.title,
                  original_title: item.title,
                  poster_path: item.posterImage,
                  release_date: item.release,
                  vote_average: item.voteAverage,
                  vote_count: item.voteCount,
                  media_type: item.mediaType as string,
                  type: item.mediaType as string,
                  id: item.itemId,
                  adult: item.adult,
                  overview: item.overview,
                  popularity: item.popularity,
                  title: item.title,
                  video: item.video as boolean,
                }}
                bookmarked={true}
                bookmarkId={item.id}
              />
            ))}
          </div>
        </>
      )}
      {shows?.length && (
        <>
          <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
            Bookmarked TV Series
          </h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:ml-6 ">
            {shows?.map((item) => (
              <Card
                key={item.id}
                type={"tv"}
                details={{
                  backdrop_path: item.backdropImage,
                  first_air_date: item.release,
                  genre_ids: item.genreId,
                  name: item.title,
                  origin_country: item.originCountry,
                  original_language: item.language,
                  original_name: item.title,
                  original_title: item.title,
                  poster_path: item.posterImage,
                  release_date: item.release,
                  vote_average: item.voteAverage,
                  vote_count: item.voteCount,
                  media_type: item.mediaType as string,
                  type: item.mediaType as string,
                  id: item.itemId,
                  adult: item.adult,
                  overview: item.overview,
                  popularity: item.popularity,
                  title: item.title,
                  video: item.video as boolean,
                }}
                bookmarked={true}
                bookmarkId={item.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarkItems;

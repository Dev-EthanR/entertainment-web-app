import Image from "next/image";
import DotSpacer from "../DotSpacer";
import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { getRelease } from "@/utils/getRelease";
import { getTitle } from "@/utils/getTitle";
import Bookmark from "../Bookmark";

interface Props {
  type: "movie" | "tv";
  details: Movie | Series;
  bookmarked?: boolean;
  bookmarkId?: string;
}

const TrendingCard = ({
  details: item,
  type,
  bookmarkId,
  bookmarked,
}: Props) => {
  return (
    <div
      className="relative w-60 lg:w-117.5 h-35 lg:h-50 rounded-lg overflow-hidden shrink-0"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Bookmark
        classname="absolute top-0 right-0 m-2 z-10"
        object={item}
        bookmarkState={bookmarked}
        bookmarkId={bookmarkId}
        type={type}
      />
      <div className="absolute bottom-0 left-0 pl-4 pb-4 h-full w-full flex flex-col justify-end text-white rounded bg-linear-to-b from-transparent to-black/30 ">
        <div className="flex gap-1.5 text-xs md:text-[15px] font-light mb-0.5">
          <span className="flex items-center gap-1.5">
            <p>{getRelease(item).split("-")[0]}</p>
            <DotSpacer color="bg-white/70" />
          </span>
          <span className="flex items-center gap-1.5">
            <p className="flex items-center gap-1">
              <Image
                src={
                  type === "movie"
                    ? "/icon-category-movie.svg"
                    : "/icon-category-tv.svg"
                }
                alt={type}
                width={12}
                height={12}
              />
              {type === "movie" ? "Movie" : "TV Series"}
            </p>
            <DotSpacer color="bg-white/70" />
          </span>
          <p>{item.original_language.toUpperCase()}</p>
        </div>
        <h3 className="text-[15px] md:text-2xl font-medium">
          {getTitle(item)}
        </h3>
      </div>
    </div>
  );
};

export default TrendingCard;

"use client";
import Image from "next/image";
import DotSpacer from "../DotSpacer";
import { useState } from "react";
import Bookmark from "../Bookmark";
import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { getTitle } from "@/utils/getTitle";
import { getRelease } from "@/utils/getRelease";

interface Props {
  type: string;
  details: Movie | Series;
  bookmarked?: boolean;
  bookmarkId?: string;
}

const Card = ({ type, details: item, bookmarked, bookmarkId }: Props) => {
  const [thumbnail, setThumbnail] = useState(
    `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
  );
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shrink-0">
      <Image
        src={thumbnail}
        alt={getTitle(item)}
        width={280}
        height={180}
        className="object-cover w-full h-45"
        onError={() => setThumbnail("/fallback.png")}
      />
      <Bookmark
        classname="absolute top-0 right-0 m-2"
        object={item}
        bookmarkState={bookmarked}
        bookmarkId={bookmarkId}
      />
      <div className="text-white pt-1.5">
        <div className="flex gap-1.5 text-xs md:text-[13px] font-light mb-0.5 text-white/70">
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
        <h3 className="text-[15px] md:text-lg font-medium">{getTitle(item)}</h3>
      </div>
    </div>
  );
};

export default Card;

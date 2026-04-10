import Image from "next/image";
import DotSpacer from "../DotSpacer";
import { useState } from "react";

interface Props {
  title: string;
  image: string;
  date: string;
  type: string;
  language: string;
}

const Card = ({ title, image, date, type, language }: Props) => {
  const [thumbnail, setThumbnail] = useState(image);
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shrink-0">
      <Image
        src={thumbnail}
        alt={title}
        width={280}
        height={180}
        className="object-cover w-full h-45"
        onError={() => setThumbnail("/fallback.png")}
      />
      <div className="text-white pt-1.5">
        <div className="flex gap-1.5 text-xs md:text-[13px] font-light mb-0.5 text-white/70">
          <span className="flex items-center gap-1.5">
            <p>{date.split("-")[0]}</p>
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
          <p>{language.toUpperCase()}</p>
        </div>
        <h3 className="text-[15px] md:text-lg font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default Card;

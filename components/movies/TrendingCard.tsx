import Image from "next/image";

interface Props {
  title: string;
  image: string;
  date: string;
  type: "movie" | "tv";
  language: string;
}

const TrendingCard = ({ title, image, date, type, language }: Props) => {
  console.log(image);
  return (
    <div
      className="relative w-60 lg:w-117.5 h-35 lg:h-50 rounded-lg overflow-hidden shrink-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-4 left-4 text-white rounded">
        <div className="flex gap-3 text-[15px] font-light mb-0.5">
          <p>{date.split("-")[0]}</p>
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
          <p>{language.toUpperCase()}</p>
        </div>
        <h3 className="text-2xl font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default TrendingCard;

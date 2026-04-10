"use client";
import { useShows } from "@/hooks/useShows";
import Card from "./Card";
import LoadTrending from "./LoadTrending";

const Shows = () => {
  const { data, status } = useShows();

  if (status === "error") return <p>Error fetching data</p>;
  return (
    <>
      <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
        TV Series
      </h2>
      {status === "pending" && (
        <div className="flex gap-4 p-4 max-w-full overflow-hidden lg:ml-2.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <LoadTrending key={index} />
          ))}
        </div>
      )}
      {status === "success" && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:ml-6 ">
          {data?.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              date={item.first_air_date}
              type={"tv"}
              language={item.original_language}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Shows;

"use client";
import { useRecommendation } from "@/hooks/useRecommendation";
import { getRelease } from "@/utils/getRelease";
import { getTitle } from "@/utils/getTitle";
import Card from "./Card";
import LoadTrending from "./LoadTrending";

const Recommended = () => {
  const { data, status } = useRecommendation();

  if (status === "error") return <p>Error fetching data</p>;

  return (
    <>
      <h2 className="text-white  lg:ml-6 text-[20px] md:text-[32px] font-light mb-4">
        Recommended for you
      </h2>
      {status === "pending" && (
        <div className="flex gap-4 p-4 max-w-full overflow-hidden lg:ml-2.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <LoadTrending key={index} />
          ))}
        </div>
      )}
      {status === "success" && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:ml-6 ">
          {data?.map((item) => (
            <Card
              key={item.id}
              title={getTitle(item)}
              image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              date={getRelease(item)}
              type={item.type!}
              language={item.original_language}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Recommended;

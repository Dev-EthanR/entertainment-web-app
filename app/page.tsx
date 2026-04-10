import Recommended from "@/components/movies/Recommended";
import Trending from "@/components/movies/Trending";

export default function Home() {
  return (
    <div className="items-start lg:ml-30 mt-18 lg:mt-10 max-w-full  lg:max-h-full lg:max-w-[calc(100vw-160px)] mb-6">
      <Trending />
      <div className="mt-6 mx-3 lg:mx-0">
        <Recommended />
      </div>
    </div>
  );
}

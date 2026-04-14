import Recommended from "@/components/movies/Recommended";
import SearchResults from "@/components/movies/SearchResults";
import Trending from "@/components/movies/Trending";
import Search from "@/components/Search";

interface Props {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const query = (await searchParams).search;
  return (
    <div className="items-start lg:ml-30 mt-18 lg:mt-10 max-w-full  lg:max-h-full lg:max-w-[calc(100vw-160px)] mb-6">
      <Search
        style="ml-3 mb-4"
        placeholder="Search for Movie or TV Series"
        searchParams={query || ""}
      />
      {query ? (
        <SearchResults searchParams={query} type="all" />
      ) : (
        <>
          <Trending />
          <div className="mt-6 mx-3 lg:mx-0">
            <Recommended />
          </div>
        </>
      )}
    </div>
  );
}

import Movies from "@/components/movies/Movies";
import SearchResults from "@/components/movies/SearchResults";
import Search from "@/components/Search";

interface Props {
  searchParams: Promise<{ search?: string }>;
}
const MoviesPage = async ({ searchParams }: Props) => {
  const query = (await searchParams).search;

  return (
    <div className="items-start lg:ml-30 mt-18 lg:mt-10 max-w-full lg:max-w-[calc(100vw-160px)] mb-6 mx-4">
      <Search
        style="ml-3 mb-4"
        placeholder="Search for Movies"
        searchParams={query || ""}
      />
      {query ? <SearchResults searchParams={query} type="movie" /> : <Movies />}
    </div>
  );
};

export default MoviesPage;

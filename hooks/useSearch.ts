import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type Data = Movie | Series;

export function useSearch(query: string, type: "all" | "movie" | "series") {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({
      pageParam,
    }): Promise<{
      results: Data[];
      page: number;
      total_pages: number;
      total_results: number;
    }> => {
      const moviesResponse = await axios.get(
        `/api/search/movie?page=${pageParam}&search=${query}`,
      );
      const normalizedMovies = moviesResponse.data.results.map((m: Movie) => ({
        ...m,
        type: "movie",
        title: m.title,
      }));
      const showResponse = await axios.get(
        `/api/search/show?page=${pageParam}&search=${query}`,
      );

      const normalizedTv = showResponse.data.results.map((s: Series) => ({
        ...s,
        type: "tv",
        title: s.name,
      }));

      let results: Data[] = [];
      let total_results = 0;
      let total_pages = 1;

      if (type === "all") {
        results = [...normalizedMovies, ...normalizedTv];
        total_results =
          moviesResponse.data.total_results + showResponse.data.total_results;
        total_pages = Math.max(
          moviesResponse.data.total_pages ?? 1,
          showResponse.data.total_pages ?? 1,
        );
      } else if (type === "movie") {
        results = normalizedMovies;
        total_results = moviesResponse.data.total_results;
        total_pages = moviesResponse.data.total_pages ?? 1;
      } else if (type === "series") {
        results = normalizedTv;
        total_results = showResponse.data.total_results;
        total_pages = showResponse.data.total_pages ?? 1;
      }

      return {
        results,
        page: pageParam,
        total_pages,
        total_results,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}

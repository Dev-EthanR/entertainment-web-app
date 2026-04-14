import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type Data = Movie | Series;

export function useRecommendation() {
  return useInfiniteQuery({
    queryKey: ["discover", "all"],
    queryFn: async ({
      pageParam,
    }): Promise<{ results: Data[]; page: number; total_pages: number }> => {
      const moviesResponse = await axios.get(
        `/api/discover/movie?page=${pageParam}`,
      );
      const showResponse = await axios.get(
        `/api/discover/show?page=${pageParam}`,
      );
      const normalizedMovies = moviesResponse.data.results.map((m: Movie) => ({
        ...m,
        type: "movie",
        title: m.title,
      }));

      const normalizedTv = showResponse.data.results.map((s: Series) => ({
        ...s,
        type: "tv",
        title: s.name,
      }));
      return {
        results: [...normalizedMovies, ...normalizedTv],
        page: pageParam,
        total_pages: Math.max(
          moviesResponse.data.total_pages ?? 1,
          showResponse.data.total_pages ?? 1,
        ),
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

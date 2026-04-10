import { Movie } from "@/utils/types/Movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMovies() {
  return useInfiniteQuery({
    queryKey: ["discover", "movie"],
    queryFn: async ({
      pageParam,
    }): Promise<{ results: Movie[]; page: number; total_pages: number }> => {
      const response = await axios.get(`/api/discover/movie?page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });
}

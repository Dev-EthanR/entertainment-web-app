import { Series } from "@/utils/types/Series";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function useShows() {
  return useInfiniteQuery({
    queryKey: ["discover", "show"],
    queryFn: async ({
      pageParam,
    }): Promise<{ results: Series[]; page: number; total_pages: number }> => {
      const response = await axios.get(`/api/discover/show?page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });
}

import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Data = Movie | Series;

export function useRecommendation() {
  return useQuery({
    queryKey: ["discover", "all"],
    queryFn: async (): Promise<Data[]> => {
      const moviesResponse = await axios.get("/api/discover/movie");
      const showResponse = await axios.get("/api/discover/show");
      const normalizedMovies = moviesResponse.data.map((m: Movie) => ({
        ...m,
        type: "movie",
        title: m.title,
      }));

      const normalizedTv = showResponse.data.map((s: Series) => ({
        ...s,
        type: "tv",
        title: s.name,
      }));
      return [...normalizedMovies, ...normalizedTv];
    },
    staleTime: 1000 * 60 * 5,
  });
}

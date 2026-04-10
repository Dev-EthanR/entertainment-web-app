import { Movie } from "@/utils/types/Movie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTrending() {
  return useQuery({
    queryKey: ["discover", "movie"],
    queryFn: async (): Promise<Movie[]> => {
      const response = await axios.get("/api/discover/movie");
      return response.data;
    },
  });
}

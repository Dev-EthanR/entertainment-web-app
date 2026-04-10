import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useShows() {
  return useQuery({
    queryKey: ["discover", "show"],
    queryFn: async (): Promise<Series[]> => {
      const response = await axios.get("/api/discover/show");
      return response.data;
    },
  });
}

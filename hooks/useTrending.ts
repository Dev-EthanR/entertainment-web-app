import { Movie } from "@/utils/types/Movie";
import { Series } from "@/utils/types/Series";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Data = Movie | Series;

export function useTrending() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: async (): Promise<Data[]> => {
      const response = await axios.get("/api/trending");
      return response.data;
    },
  });
}

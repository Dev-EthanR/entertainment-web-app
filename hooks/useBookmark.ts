import { Bookmark } from "@/lib/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useBookmark() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async (): Promise<Bookmark[]> => {
      const response = await axios.get("/api/bookmark");
      return response.data;
    },
  });
}

import { Data } from "@/hooks/useTrending";

export const getRelease = (item: Data) =>
  "release_date" in item ? item.release_date : item.first_air_date;

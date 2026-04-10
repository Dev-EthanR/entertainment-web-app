import { Data } from "@/hooks/useTrending";

export const getTitle = (item: Data) =>
  "title" in item ? item.title : item.name;

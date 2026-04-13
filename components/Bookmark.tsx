"use client";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { Series } from "@/utils/types/Series";
import { Movie } from "@/utils/types/Movie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  classname?: string;
  object: Movie | Series;
  bookmarkState?: boolean;
  bookmarkId?: string;
  type?: string;
}

const Bookmark = ({
  classname,
  object,
  bookmarkState = false,
  bookmarkId,
  type,
}: Props) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarkState);
  const image = isBookmarked
    ? "/icon-bookmark-full.svg"
    : "/icon-bookmark-empty.svg";
  const { mutate } = useMutation({
    mutationFn: async (nextState: boolean) => {
      if (nextState === false && bookmarkId) {
        return axios.delete(`/api/bookmark/${bookmarkId}`);
      }
      return axios.post("/api/bookmark", { ...object, type });
    },
    onError: () => {
      setIsBookmarked((prev) => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
  const queryClient = useQueryClient();
  const handleClick = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    mutate(nextState);
  };

  return (
    <Button
      className={clsx(
        "bg-primary-950/50 rounded-full p-2.5 cursor-pointer",
        classname,
      )}
      onClick={handleClick}
    >
      <Image src={image} alt={""} width={14} height={14} />
    </Button>
  );
};

export default Bookmark;

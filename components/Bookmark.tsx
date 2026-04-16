"use client";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { Series } from "@/utils/types/Series";
import { Movie } from "@/utils/types/Movie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Bookmark as BookmarkType } from "@/lib/generated/prisma/client";

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
      if (!nextState && bookmarkId) {
        const res = await axios.delete<BookmarkType>(
          `/api/bookmark/${bookmarkId}`,
        );
        return res.data;
      }
      const res = await axios.post<BookmarkType>("/api/bookmark", {
        ...object,
        type,
      });
      return res.data;
    },
    onMutate: async (nextState: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });

      const previous = queryClient.getQueryData<BookmarkType[]>(["bookmarks"]);

      queryClient.setQueryData<BookmarkType[]>(["bookmarks"], (old = []) => {
        if (nextState) {
          return [
            ...old,
            {
              id: "temp",
              itemId: object.id,
            } as BookmarkType,
          ];
        } else {
          return old.filter((b) => b.id !== bookmarkId);
        }
      });

      return { previous }; // returned as context
    },
    onError: (_err, _nextState, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["bookmarks"], context.previous);
      }
      setIsBookmarked((prev) => !prev);
    },
    onSuccess: (data, nextState) => {
      if (nextState) {
        queryClient.setQueryData<BookmarkType[]>(["bookmarks"], (old = []) =>
          old.map((b) => (b.id === "temp" ? data : b)),
        );
      }
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

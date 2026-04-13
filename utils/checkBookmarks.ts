import { Data } from "@/hooks/useRecommendation";
import { Bookmark } from "@/lib/generated/prisma/client";

export const checkBookmark = (arr: Data[], bookmarkHook: Bookmark[]) => {
  return arr?.map((rec) => {
    const matchedBookmark = bookmarkHook?.find((b) => b.itemId === rec.id);

    return {
      ...rec,
      isBookmarked: !!matchedBookmark,
      bookmarkId: matchedBookmark?.id ?? null,
    };
  });
};

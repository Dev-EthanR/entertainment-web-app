import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRelease } from "@/utils/getRelease";
import { getTitle } from "@/utils/getTitle";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const data = await prisma.bookmark.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { overview, popularity, video, adult } = body;
  const newBookmark = await prisma.bookmark.create({
    data: {
      itemId: body.id,
      title: getTitle(body),
      mediaType: body.type,
      backdropImage: body.backdrop_path,
      genreId: body.genre_ids,
      release: getRelease(body),
      posterImage: body.poster_path,
      language: body.original_language,
      overview,
      popularity,
      video,
      adult,
      voteAverage: body.vote_average,
      voteCount: body.vote_count,
      userId: session?.user?.id,
    },
  });
  return NextResponse.json(newBookmark, { status: 201 });
}

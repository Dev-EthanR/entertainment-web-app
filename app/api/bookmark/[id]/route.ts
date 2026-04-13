import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });
  const { id } = await params;

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id,
    },
  });

  if (!bookmark)
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  if (bookmark?.userId !== session?.user?.id)
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });

  const deleteBookmark = await prisma.bookmark.delete({
    where: { id: bookmark.id },
  });
  return NextResponse.json(deleteBookmark, { status: 200 });
}

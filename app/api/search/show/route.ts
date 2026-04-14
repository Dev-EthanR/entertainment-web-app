import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("search") || "";
  const page = request.nextUrl.searchParams.get("page") || 1;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );
  const data = await response.json();
  return NextResponse.json({
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
  });
}

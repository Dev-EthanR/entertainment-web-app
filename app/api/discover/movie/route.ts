import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${page}&primary_release_date.gte=2001-01-01&sort_by=popularity.desc&vote_count.gte=5000&primary_release_date.lte=2024-01-01`,
  );
  const data = await response.json();
  return NextResponse.json({
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
  });
}

export async function GET() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&primary_release_date.gte=2001-01-01&sort_by=popularity.desc&vote_count.gte=5000&primary_release_date.lte=2024-01-01`,
  );
  const data = await response.json();
  return Response.json(data.results);
}

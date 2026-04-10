export async function GET() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`,
  );
  const data = await response.json();
  return Response.json(data.results);
}

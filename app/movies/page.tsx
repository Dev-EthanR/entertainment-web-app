import Movies from "@/components/movies/Movies";

const MoviesPage = () => {
  return (
    <div className="items-start lg:ml-30 mt-18 lg:mt-10 max-w-full lg:max-w-[calc(100vw-160px)] mb-6 mx-4">
      <Movies />
    </div>
  );
};

export default MoviesPage;

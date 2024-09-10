import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../tmdbAPI";
import MoviesList from "../../components/MovieList/MovieList";
import { InfinitySpin } from "react-loader-spinner";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const results = await getTrendingMovies();
        if (results) {
          setMovies(results);
        } else {
          setError("No movies found");
        }
      } catch (err) {
        setError("Error fetching movies");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <InfinitySpin width="200" color="#4fa94d" />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trending Movies</h1>
      <MoviesList list={movies} />
    </div>
  );
}

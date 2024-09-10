import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getMovieByID, posterURL } from "../../tmdbAPI";
import css from "./MovieDetails.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieID } = useParams();
  const location = useLocation();

  const backLink = useRef(
    location.state?.from ?? { pathname: "/movies", search: "" }
  );

  useEffect(() => {
    async function fetchMovieByID() {
      setLoading(true);
      try {
        const result = await getMovieByID(movieID);
        setMovie(result);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieByID();
  }, [movieID]);

  if (loading) {
    return (
      <div className={css.loader}>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  if (!movie) {
    return <div className={css.noMovie}>No movie found</div>;
  }

  const {
    poster_path,
    title,
    release_date: date,
    overview,
    genres,
    vote_average: avg,
  } = movie;
  const heading = `${title} (${date ? date.slice(0, 4) : "N/A"})`;
  const genresList = genres.map((genre) => genre.name).join(", ");

  return (
    <div className={css.detailsWrap}>
      <Link
        to={backLink.current.pathname + backLink.current.search}
        className={css.backLink}
      >
        &lt;&lt; Go back
      </Link>
      <div className={css.content}>
        <img className={css.poster} src={posterURL(poster_path)} alt={title} />
        <div className={css.textContent}>
          <h2 className={css.title}>{heading}</h2>
          <p className={css.overview}>{overview}</p>
          <h3 className={css.subHeading}>Genres</h3>
          <p className={css.genres}>{genresList}</p>
          <h3 className={css.subHeading}>Rating</h3>
          <p className={css.rating}>{avg}</p>
        </div>
      </div>
      <div className={css.links}>
        <Link className={css.link} to="cast">
          Cast
        </Link>
        <Link className={css.link} to="reviews">
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

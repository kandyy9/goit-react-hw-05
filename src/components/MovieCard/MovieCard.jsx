import { posterURL } from "../../tmdbAPI";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieCard.module.css";

export default function MovieCard({ movie }) {
  const location = useLocation();

  return (
    <div className={css.cardWrapper}>
      <Link
        className={css.content}
        to={`/movies/${movie.id}`}
        state={{ from: location }}
      >
        {movie.poster_path ? (
          <img
            className={css.contentImage}
            src={posterURL(movie.poster_path)}
            alt=""
          />
        ) : (
          <div className={css.fallbackCard}>
            <span className={css.fallbackMessage}>
              We couldn't find this poster :(
            </span>
          </div>
        )}
        {movie.title}
      </Link>
    </div>
  );
}

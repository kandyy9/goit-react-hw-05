import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

export default function MoviesList({ list }) {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {list.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}

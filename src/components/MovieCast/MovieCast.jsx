import { getCast, posterURL } from "../../tmdbAPI";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieID } = useParams();

  useEffect(() => {
    async function fetchCast() {
      setLoading(true);
      try {
        const result = await getCast(movieID);
        setCast(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [movieID]);

  if (loading) return <InfinitySpin width="200" color="#4fa94d" />;
  if (!cast || cast.length === 0)
    return <div className={css.noCast}>No cast available</div>;

  return (
    <ul className={css.castList}>
      {cast.map(({ profile_path, name, character, id }) => (
        <li key={id} className={css.castItem}>
          {profile_path ? (
            <img
              className={css.castImage}
              src={posterURL(profile_path)}
              alt={name}
            />
          ) : (
            <div className={css.fallbackCard}>
              <span className={css.fallbackMessage}>
                We couldn't find this poster :(
              </span>
            </div>
          )}
          <div className={css.castInfo}>
            <p className={css.castName}>{name}</p>
            <p className={css.castCharacter}>{`Character: ${character}`}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

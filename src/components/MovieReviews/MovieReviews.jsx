import { getReviews } from "../../tmdbAPI";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieID } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const result = await getReviews(movieID);
        setReviews(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieID]);

  if (loading) return <InfinitySpin width="200" color="#4fa94d" />;
  if (!reviews || reviews.length === 0)
    return (
      <div className={css.noReviews}>
        We do not have any reviews for this movie
      </div>
    );

  return (
    <ul className={css.reviewsList}>
      {reviews.map(({ author, content, id }) => (
        <li key={id} className={css.reviewItem}>
          <h4 className={css.reviewAuthor}>{`Author: ${author}`}</h4>
          <p className={css.reviewContent}>{content}</p>
        </li>
      ))}
    </ul>
  );
}

import { getMoviesByQuery } from "../../tmdbAPI";
import MoviesList from "../../components/MovieList/MovieList";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, Outlet } from "react-router-dom";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const onSearch = (query) => {
    setSearchedMovies([]);
    setPage(1);
    setSearchParams({ query, page: 1 });
  };

  useEffect(() => {
    const fetchMoviesByQuery = async () => {
      if (!searchQuery) return;

      try {
        const response = await getMoviesByQuery(searchQuery, currentPage);
        if (response.length === 0) {
          toast.error("No movies found!");
          setSearchedMovies([]);
          return;
        }
        setSearchedMovies(response);
        setTotalPages(response.total_pages);
      } catch (error) {
        toast.error("An error occurred while fetching movies.");
        console.error("Error fetching movies:", error);
      }
    };
    fetchMoviesByQuery();
  }, [searchQuery, currentPage]);

  const handlePrevPage = () => {
    if (currentPage === 1) {
      toast.error("This is the first page.");
    } else {
      const newPage = currentPage - 1;
      setPage(newPage);
      setSearchParams({ query: searchQuery, page: newPage });
    }
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) {
      toast.error("No more pages.");
    } else {
      const newPage = currentPage + 1;
      setPage(newPage);
      setSearchParams({ query: searchQuery, page: newPage });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className={css.container}>
        <Formik
          initialValues={{ query: searchQuery || "" }}
          onSubmit={(values, actions) => {
            const { query } = values;
            if (query === "") {
              toast.error("Search query cannot be empty!");
              setSearchedMovies([]);
              setSearchParams({ query: "", page: 1 });
            } else {
              onSearch(query);
            }
            actions.resetForm();
          }}
        >
          <Form className={css.searchForm}>
            <Field
              id="query"
              name="query"
              className={css.searchField}
              placeholder="Search for movies..."
            />
            <button type="submit" className={css.searchButton}>
              Search
            </button>
          </Form>
        </Formik>

        {searchedMovies.length > 0 && (
          <div className={css.pagination}>
            <button onClick={handlePrevPage} className={css.pageButton}>
              Prev
            </button>
            <button onClick={handleNextPage} className={css.pageButton}>
              Next
            </button>
          </div>
        )}

        <MoviesList list={searchedMovies} />

        <Outlet />
      </div>
    </>
  );
}

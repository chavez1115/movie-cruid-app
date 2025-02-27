import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import withAuth from "@/utils/withAuth";
import ButtonComponent from "@/components/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const MovieList = () => {
  const { user, signOut } = useAuth();
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [moviesPerRow, setMoviesPerRow] = useState(10);
  const [maxRows] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1035);
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation("common");
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const updateCardsPerRow = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 1035);

      if (screenWidth >= 1624) {
        setMoviesPerRow(5);
      } else if (screenWidth >= 1342) {
        setMoviesPerRow(4);
      } else if (screenWidth >= 1035) {
        setMoviesPerRow(3);
      } else {
        setMoviesPerRow(2);
      }
    };
    window.addEventListener("resize", updateCardsPerRow);
    updateCardsPerRow();
    return () => window.removeEventListener("resize", updateCardsPerRow);
  }, [currentPage, window.innerWidth]);

  useEffect(() => {
    const fetchMovies = () => {
      let url = backend_url + "/movies";

      if (isMobile) {
        axios
          .get(url)
          .then((res) => {
            setMovies(res.data.movies);
            setTotalMovies(res.data.totalMovies);
          })
          .catch((err) => console.error(err));
      } else {
        axios
          .get(url, {
            params: {
              page: currentPage,
              limit: moviesPerRow * maxRows,
            },
          })
          .then((res) => {
            setMovies(res.data.movies);
            setTotalMovies(res.data.totalMovies);
          })
          .catch((err) => console.error(err));
      }
    };

    fetchMovies();
  }, [currentPage, isMobile, moviesPerRow]);

  const handleCreateMovie = () => {
    router.push("/movies/manage");
  };

  const handleEditMovie = (movieId: string) => {
    router.push({ pathname: "/movies/manage", query: { movieId: movieId } });
  };

  const handleLogOut = () => {
    signOut();
  };

  const totalPages = Math.ceil(totalMovies / moviesPerRow / 2);

  const generatePageNumbers = () => {
    const range = [];
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage > 2) {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      if (currentPage === 1) {
        range.push(currentPage, currentPage + 1, currentPage + 2);
      } else if (currentPage === totalPages) {
        range.push(currentPage - 2, currentPage - 1, currentPage);
      } else {
        range.push(startPage, currentPage, endPage);
      }

      if (range[0] > 1) range.unshift("...");
      if ((range[range.length - 1] as number) < totalPages) range.push("...");
    }

    return range;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <Layout>
      <Box
        sx={{
          padding: {
            xs: "80px 14px 0px 14px",
            sm: "120px 108px 48px 108px",
          },
        }}
      >
        <Box sx={{ margin: "0px 12px" }} className="header">
          <Box className="left-section">
            <Typography
              component="div"
              sx={{
                fontSize: {
                  xs: theme.typography.h3.fontSize,
                  sm: theme.typography.h2.fontSize,
                },
                lineHeight: {
                  xs: theme.typography.h3.lineHeight,
                  sm: theme.typography.h2.lineHeight,
                },
              }}
              className="title"
            >
              {t("my-movies")}
              <Box component="section" className="icon-container">
                <Box
                  component="img"
                  src="/plus_button.png"
                  onClick={handleCreateMovie}
                  sx={{
                    height: { xs: 24, md: 32 },
                    width: { xs: 24, md: 32 },
                  }}
                  className="icon"
                />
              </Box>
            </Typography>
          </Box>
          <Box className="right-section">
            <span className="logout-button" onClick={handleLogOut}>
              {!isMobile && t("logout")}
              <span className="icon-container">
                <Box
                  component="img"
                  sx={{
                    height: { xs: 24, md: 32 },
                    width: { xs: 24, md: 32 },
                  }}
                  alt="logout button"
                  src="/logout_button.png"
                  className="icon"
                />
              </span>
            </span>
          </Box>
        </Box>

        {movies.length > 0 ? (
          <Box
            sx={{
              marginTop: {
                xs: "70px",
                sm: "110px",
              },
            }}
          >
            <Box className="movies">
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  image={backend_url + "/uploads/posters/" + movie.poster}
                  title={movie.title}
                  year={movie.year}
                  onClick={() => handleEditMovie(movie._id)}
                />
              ))}
            </Box>
            {!isMobile && (
              <Box
                className="pagination"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  justifyContent: "center",
                  marginTop: "80px",
                }}
              >
                <button
                  className="pagination-button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  style={{
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  {t("prev")}
                </button>
                {pageNumbers.map((page, index) => (
                  <button
                    key={index}
                    className="pagination-button-number"
                    onClick={() =>
                      page !== "..." && setCurrentPage(page as number)
                    }
                    disabled={page === "..." || page === currentPage}
                    style={{
                      backgroundColor:
                        page === currentPage ? "#2bd17e" : "#092c39",
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="pagination-button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  style={{
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  {t("next")}
                </button>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            className="empty-movie-list"
            sx={{ padding: { xs: "255px 24px", sm: "248px 425px" } }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: {
                  xs: theme.typography.h3.fontSize,
                  sm: theme.typography.h2.fontSize,
                },
                lineHeight: {
                  xs: theme.typography.h3.lineHeight,
                  sm: theme.typography.h2.lineHeight,
                },
              }}
              className="title"
            >
              {t("empty-movie")}
            </Typography>
            <ButtonComponent
              onClick={handleCreateMovie}
              label={t("add-movie")}
              sx={{
                width: { sm: "202px", xs: "380px" },
                height: "56px",
                marginTop: "40px",
              }}
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default withAuth(MovieList);

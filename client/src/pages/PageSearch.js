import React, { useEffect, useState } from "react";
import { Container, Grid, useTheme, makeStyles } from "@material-ui/core";
import PaginationPage from "../components/PaginationPage";
import MovieListGrid from "../components/MovieListGrid";

import api from "../api/api";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

export default function PageSearch(props) {
  const classes = useStyles();
  const theme = useTheme();

  const languagePage = useSelector((state) => state);

  const { search } = props.location;
  const searchType = props.searchType;
  const searchMovie = props.searchMovie;

  const [MovieList, setMovieList] = useState([]);
  const [page_, setpage_] = useState(parseInt(1));
  const [total_pages, setTotal_pages] = useState(0);
  const [total_results, setTotal_results] = useState(0);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    // title page
    document.title =
      (languagePage === "pt-BR" ? "Pesquisa" : "Search") +
      " | " +
      process.env.REACT_APP_NAME;
    setResetStates();
    const getSearch = async () => {
      try {
        const { data } = await api.post(
          `search/${languagePage}/${page_}/${search}`,
          {
            option: searchType,
          }
        );

        const { page, total_results, total_pages, results } = data;
        //Busca não encontrada, Por gentilza tentar novamente mais tarde.
        if (results.length === 0) {
          seterrorMessage({
            status: "",
            statusText:
              languagePage === "pt-BR"
                ? "Busca não encontrada"
                : "search not found",
          });
          return;
        }

        setTimeout(() => {
          setpage_(page);
          setMovieList(results);
          setTotal_pages(total_pages);
          setTotal_results(total_results);
        }, 2000);
      } catch (error) {
        const { status, statusText } = error.response;
        seterrorMessage({ status, statusText });
      }
    };

    getSearch();
  }, [page_, languagePage, searchType, search]);

  const handleChangePage = (value) => {
    setpage_(value);
    let Newarray = [...MovieList];
    Newarray.length = 0;
    setMovieList(Newarray);
  };
  const setResetStates = () => {
    let newObj = [...MovieList];
    newObj.length = 0;
    setMovieList(newObj);
  };

  return MovieList.length === 0 && errorMessage === null ? (
    <Spinner />
  ) : (
    <Container fixed>
      {errorMessage === null ? (
        <>
          <Grid
            container
            className={classes.movieGrid}
            style={{
              marginTop: theme.spacing(4),
              marginBottom: theme.spacing(4),
            }}
          >
            <h2>
              {languagePage === "pt-BR"
                ? `Total de ${total_results} resultados para Pesquisa de: "${unescape(
                    searchMovie
                  )}"`
                : `Total of ${total_results} results for Search: "${unescape(
                    searchMovie
                  )}"`}
            </h2>
            {MovieList.length === 0 && <Spinner />}
            {MovieList.length > 0 && (
              <Grid item className={classes.movieGrid__listarea} xs={12}>
                <MovieListGrid movieList={MovieList} />;
                {/* {MovieList.map((item, index) => {
          })} */}
              </Grid>
            )}
          </Grid>
          <PaginationPage
            linkPage={`search/${search}`}
            pageLink={page_}
            total_pages_pagination={total_pages}
            onPage={handleChangePage}
            search={true}
          />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
            color: theme.palette.primary.main,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontFamily: "AllOverAgain",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {errorMessage.status}
            <span style={{ fontSize: 70 }}>{errorMessage.statusText}</span>
          </h1>
        </div>
      )}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  movieGrid: {
    marginTop: theme.spacing(8),
    "& h2": {
      margin: `0px 0px ${theme.spacing(1)} 30px`,
      fontSize: "1.5rem",
      "& small": {
        fontSize: "12px",
        marginLeft: theme.spacing(2),
        cursor: "pointer",

        "& a": {
          color: "#4FB0C6",

          "&:hover": {
            background: "none",
            color: "#4F86C6",
          },
        },
      },
    },
  },
  /*   movieGrid__listarea: {
    overflowX: "hidden",
  },
 */
  [theme.breakpoints.down("sm")]: {
    movieGrid: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
    },
  },

  [theme.breakpoints.down("md")]: {
    movieGrid__listarea: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      textAlign: "left !important",
    },
  },
}));

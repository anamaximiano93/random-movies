import React, { useState, useEffect } from "react";

import language from "../Helper/language";
import "../assets/css/fonts.css";

import api from "../api/api";
import Spinner from "../components/Spinner";
import { Grid, makeStyles, useTheme, Container } from "@material-ui/core";

import PaginationPage from "../components/PaginationPage";
import MovieListGrid from "../components/MovieListGrid";
import { useSelector } from "react-redux";

export default function PageMovieList(props) {
  const classes = useStyles();
  const theme = useTheme();

  // PROPS
  const match = props.match;

  const languagePage = useSelector((state) => state);

  const { route_page, route } = match.params;

  //STATES
  const [MovieList, setMovieList] = useState([]);
  const [page_, setpage_] = useState(parseInt(route_page));
  const [total_pages, setTotal_pages] = useState(0);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    // title page
    document.title =
      LanguagePageFunction().toLocaleLowerCase() + " | " + "Random Movies";
    const loadDataMovieList = async () => {
      try {
        const { data } = await api.get(`/${route}/${languagePage}/${page_}`);
        const { total_pages, results } = data;

        if (total_pages && results) {
          setMovieList(results);
          setTotal_pages(total_pages);
        }
      } catch (error) {
        const { status, statusText } = error.response;
        seterrorMessage({ status, statusText });
      }
    };
    loadDataMovieList();
  }, [languagePage, page_, route]);

  const handleChangePage = (value) => {
    setpage_(value);
    let Newarray = [...MovieList];
    Newarray.length = 0;
    setMovieList(Newarray);
  };

  const LanguagePageFunction = () => {
    let title = "";
    if (languagePage === "pt-BR") {
      language[0].Page.forEach((item) => {
        if (item.pageUrl === route)
          title = item.TitlePage.toString().toUpperCase();
      });
    } else {
      language[1].Page.forEach((item) => {
        if (item.pageUrl === route)
          title = item.TitlePage.toString().toUpperCase();
      });
    }
    return title;
  };

  return (
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
            <h2>{LanguagePageFunction()}</h2>
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
            linkPage={route}
            pageLink={page_}
            total_pages_pagination={total_pages}
            onPage={handleChangePage}
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
    display: "flex",
    marginTop: theme.spacing(8),
    "& h2": {
      margin: `0px 0px ${theme.spacing(1)} 30px`,
      fontSize: "2rem",
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

  [theme.breakpoints.down("xs")]: {},

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

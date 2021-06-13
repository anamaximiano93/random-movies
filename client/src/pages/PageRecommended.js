import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Container, Grid, makeStyles, useTheme } from "@material-ui/core";
import MovieListGrid from "../components/MovieListGrid";

import api from "../api/api";
import PaginationPage from "../components/PaginationPage";
import { useSelector } from "react-redux";

export default function PageRecommended(props) {
  const classes = useStyles();
  const theme = useTheme();

  // PROPS
  const match = props.match;

  const languagePage = useSelector((state) => state);

  const { route_page, idTmdb } = match.params;

  const [MovieList, setMovieList] = useState([]);
  const [page_, setpage_] = useState(parseInt(route_page));
  const [total_pages, setTotal_pages] = useState(0);

  useEffect(() => {
    // title page
    document.title =
      (languagePage === "pt-BR" ? "recomendações" : "recommendations") +
      " | " +
      "Random Movies";

    const getRecommendation = async () => {
      console.log(props);
      const { data } = await api.post(
        `/${"recommendations"}/${languagePage}/${page_}`,
        {
          idTmDB: props.match.params.idTmdb,
        }
      );

      const { total_pages, results } = data;
      console.log(data);
      setMovieList(results);
      setTotal_pages(total_pages);
    };
    getRecommendation();
  }, [page_, languagePage, props]);

  const handleChangePage = (value) => {
    setpage_(value);
    let Newarray = [...MovieList];
    Newarray.length = 0;
    setMovieList(Newarray);
  };

  return (
    <Container fixed>
      <Grid
        container
        className={classes.movieGrid}
        style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}
      >
        <h2>
          {languagePage === "pt-BR"
            ? "Recomendações".toString().toUpperCase()
            : "Recommendations".toString().toUpperCase()}
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
        linkPage={`${"recommendations"}/${idTmdb}`}
        pageLink={page_}
        total_pages_pagination={total_pages}
        onPage={handleChangePage}
      />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  movieGrid: {
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

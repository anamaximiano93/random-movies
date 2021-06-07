import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import PosterDefault from "../assets/images/poster_path_default.svg";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";

export default function MovieListRow({ movie, linkPageMovie, marginStyles }) {
  const classes = useStyles();
  const theme = useTheme();
  const languagePage = useSelector((state) => state);
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    console.log(window.innerWidth);
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movie.results.length * 202;

    //prettier-ignore
    if ((window.innerWidth - listW) > x) {
        //prettier-ignore
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  };
  console.log(window.innerWidth);

  return (
    <Grid className={classes.movieRow}>
      <h2 style={marginStyles}>
        {languagePage === "pt-BR"
          ? movie.title_page.toUpperCase()
          : movie.original_title_page.toUpperCase()}
        <small>
          <Button to={linkPageMovie} component={Link}>
            {languagePage === "pt-BR" ? "Ver mais" : "See more"}
          </Button>
        </small>
      </h2>

      <Grid className={classes.movieRow__listarea}>
        <Grid
          item
          className={classes.movieRow__list}
          style={{ marginLeft: scrollX, width: movie.results.length * 250 }}
          key={movie.original_title_page + Math.random(20 * 100)}
        >
          <div
            id="left"
            style={{ left: 0 }}
            className={classes.navigateIcon}
            onClick={handleLeftArrow}
          >
            <NavigateBeforeIcon style={{ fontSize: "50" }} />
          </div>

          <div
            id="right"
            style={{ right: 0 }}
            className={classes.navigateIcon}
            onClick={handleRightArrow}
          >
            <NavigateNextIcon style={{ fontSize: "50" }} />
          </div>
          {movie.results.map((item) => {
            let values = {
              //prettier-ignore
              imgSrc: item.poster_path.slice(35, item.poster_path.length) === "null"
                  ? PosterDefault
                  : item.poster_path,
              imgAlt: item.original_title,
              imgTitle: item.original_title,
              title: item.original_title,
            };

            /*  if (languagePage === "pt-BR") {
              values = {
                imgSrc:
                  item.poster_path !== null ? item.poster_path : PosterDefault,
                imgAlt: item.title,
                imgTitle: item.title,
                title: item.title,
              };
            } else {
              values = {
                imgSrc:
                  item.poster_path_original !== null
                    ? item.poster_path
                    : PosterDefault,
                imgAlt: item.original_title,
                imgTitle: item.original_title,
                title: item.original_title,
              };
            } */
            return (
              <MovieItem values={values} movieItem={item} key={item.idTmDB} />
              /*  <Grid
                item
                className={classes.movieRow__item}
                key={`${item.imdbID}${movie.title_page}${Math.random(10 * 10)}`}
              >
                <GridListTile component="div">
                  <Link to={`/detail/movie/${item.idTmDB}`}>
                    <img
                      src={values.imgSrc}
                      alt={values.imgAlt}
                      title={values.imgTitle}
                    />
                    <GridListTileBar
                      titlePosition={"bottom"}
                      style={{
                        marginBottom: "4px",
                        backgroundImage: "linear-gradient(#1c0619 , #1c0619)",
                        opacity: "0.8",
                        textAlign: "right",
                      }}
                      title={
                        <strong
                          style={{
                            //color: "#F79F1F",
                            color: "#02c86d", //'#45c0c4',
                            fontWeight: "bold",
                            fontSize: "20px",
                            textShadow: "2px 2px 5px #000", //"2px 2px 5px #000",
                          }}
                          // >{`IMDB ${item.imdbRating}`}</strong>
                        >{`TMDB ${item.vote_average}`}</strong>
                      }
                    />
                  </Link>
                </GridListTile>
                <Grid item className={classes.movieName}>
                  <Typography style={{ fontWeight: "bold" }}>
                    {values.title}
                  </Typography>
                </Grid>
              </Grid> */
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  movieRow: {
    /*  marginTop: theme.spacing(1), */
    marginTop: theme.spacing(6),
    //marginBottom: theme.spacing(4),
    "& h2": {
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
    "&:hover": {
      "& div#left": {
        opacity: 1,
      },
      "& div#right": {
        opacity: 1,
      },
    },

    "&:nth-child(5)": {
      marginBottom: theme.spacing(4),
    },
  },
  movieRow__listarea: {
    margin: theme.spacing(1),
    overflowX: "hidden",
  },
  movieRow__item: {
    display: "inline-block",
    width: "200px",
    cursor: "pointer",

    transform: "scale(0.9)",
    "& img": {
      width: "100%",

      transition: "all ease 0.2s",
    },
    "&:hover": {
      transform: "scale(1)",
    },
  },

  movieName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    //width: "200px",
    //color: theme.palette.secondary.main,
  },
  navigateIcon: {
    display: "flex",
    position: "absolute",
    width: "40px",
    height: "300px",
    //background: "rgba(0,0,0,0.4)",
    background: "rgba(28,6,25,0.6)",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: "0px 6px 0px 6px",
    cursor: "pointer",
    color: theme.palette.secondary.main,
    opacity: 0,
  },

  /* mobile version*/
  [theme.breakpoints.down("xs")]: {
    navigateIcon: {
      opacity: 1,
      height: "290px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    navigateIcon: {
      opacity: 1,
    },
  },

  [theme.breakpoints.down("md")]: {
    navigateIcon: {
      opacity: 1,
    },
  },
}));

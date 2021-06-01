import {
  Grid,
  GridListTile,
  GridListTileBar,
  makeStyles,
  Typography,
  //useTheme,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function MovieItem({ values, movieItem }) {
  //const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid
      item
      className={classes.movieGrid__item}
      key={`${values.idTmDB}${movieItem.title_page}${Math.random(10 * 100)}`}
    >
      <GridListTile component="div">
        <Link to={`/detail/movie/${movieItem.idTmDB}`}>
          <img
            src={values.imgSrc}
            alt={values.imgAlt}
            title={values.imgTitle}
          />
          <GridListTileBar
            titlePosition={"bottom"}
            style={{
              marginBottom: "4px",
              backgroundImage: "linear-gradient(#1c0619 , #1c0619)", //  backgroundImage: "linear-gradient(black, black)",
              opacity: "0.8",
              textAlign: "right",
            }}
            title={
              <strong
                style={{
                  // color: "#F79F1F",
                  color: "#02c86d", //'#45c0c4',
                  fontWeight: "bold",
                  fontSize: "20px",
                  textShadow: "2px 2px 5px #032541", //2px 2px 5px #000",
                }}
              >{`TMDB ${movieItem.vote_average}`}</strong>
            }
          />
        </Link>
      </GridListTile>
      <Grid item className={classes.movieName}>
        <Typography style={{ fontWeight: "bold" }}>{values.title}</Typography>
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  movieGrid__item: {
    display: "inline-block",
    width: "200px", //250
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
  },
  /* mobile version*/
  [theme.breakpoints.down("xs")]: {},

  [theme.breakpoints.down("sm")]: {},

  [theme.breakpoints.down("md")]: {},
}));

import React from "react";
import {
  Grid,
  Divider,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";

import imdb from "../assets/images/imdb.svg";
import tmdb from "./../assets/images/tmdb.svg";

import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarOutlineRoundedIcon from "@material-ui/icons/StarBorderRounded";
import Rating from "@material-ui/lab/Rating";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

import backdrop_path_default from "../assets/images/backdrop_path_default.svg";
import poster_path_default from "../assets/images/poster_path_default.svg";

import {
  getTimeFromMins,
  getGernesfromArrytostring,
  getActorsfromArraytoString,
  getDateFull,
  getCrewsfromArrytostring,
} from "../Helper/functions";

import "../assets/css/fonts.css";
import { useSelector } from "react-redux";

export default function Details({ details, certification }) {
  const languagePage = useSelector((state) => state);
  const classes = useStyles();
  const theme = useTheme();
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    runtime,
    genres,
    videos,
    year,
    casts,
    crews,
    imdbRating,
    vote_average,
    release_date,
  } = details;

  /* pega o voto para prenhecer as estrelas do ratings */
  const getVoteStar = (imdbVote, tmdbVote) => {
    let vote = 0;
    if (imdbVote !== "N/A" && imdbVote !== undefined) {
      vote = parseFloat(imdbVote) + parseFloat(tmdbVote);
      vote = vote / 2;
    } else {
      vote = tmdbVote;
    }

    //prettier-ignore
    const value = (vote / 10) * 5;

    return value;
  };

  return (
    <Grid
      container
      style={{
        background: `url(${
          backdrop_path === null ? backdrop_path_default : backdrop_path
        }) no-repeat top fixed `,
        backgroundSize: "135.0rem",
      }}
    >
      <Grid
        container
        className={classes.containerInfoDetailsMovie}
        style={{ background: "rgba(28, 6, 25, 0.6)" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={4}
          className={classes.containerPoster}
        >
          <div className={classes.wrapper}>
            <img
              src={poster_path === null ? poster_path_default : poster_path}
              alt={title}
              title={title}
              className={classes.blurred}
            />
            <img
              src={poster_path === null ? poster_path_default : poster_path}
              alt={title}
              title={title}
              className={classes.cover}
            />
          </div>
          <div>
            <Rating
              name="half-rating-read"
              defaultValue={getVoteStar(imdbRating, vote_average)}
              precision={0.5}
              readOnly
              icon={<StarRoundedIcon style={{ fontSize: "50px" }} />}
              emptyIcon={
                <StarOutlineRoundedIcon
                  style={{ fontSize: "50px", color: "#ffb400" }}
                />
              }
            />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          className={classes.detailsMovie}
        >
          <Grid /* className={classes.containerInfoDetailsMovie} */>
            <Grid item xs={12} md={12} lg={12} className={classes.titleMovie}>
              <h2>
                {title}
                <span>({year})</span>
              </h2>
            </Grid>
            <Grid container className={classes.detailsinfo}>
              <Grid item className={classes.detailsInfoMovie}>
                <img
                  src={tmdb}
                  alt="TMDB"
                  style={{
                    verticalAlign: "middle",
                    width: "40px",
                  }}
                />
                <Typography>
                  {vote_average === undefined ? "N/A" : vote_average}
                </Typography>

                <Divider className={classes.divider} orientation="vertical" />

                <img
                  src={imdb}
                  alt="IMDB"
                  style={{
                    verticalAlign: "middle",
                    width: "55px",
                  }}
                />
                <Typography>
                  {imdbRating === undefined ? "N/A" : imdbRating}
                </Typography>

                <Divider className={classes.divider} orientation="vertical" />

                <AccessAlarmsIcon />
                <Typography>{getTimeFromMins(runtime)}</Typography>

                <Divider className={classes.divider} orientation="vertical" />

                <EventAvailableIcon />
                <Typography>{getDateFull(release_date)}</Typography>

                <Divider className={classes.divider} orientation="vertical" />

                <span
                  style={{
                    background: `${certification.color}`,
                    borderRadius: "5px",
                    textAlign: "center",
                    lineHeight: "30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#fff",
                    border: "1px solid #fff",
                    marginLeft: theme.spacing(2),
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                  }}
                >
                  {certification.certification}
                </span>
                <Typography>
                  {languagePage === "pt-BR"
                    ? "Classificação de conteúdo"
                    : "Content advisory"}
                </Typography>
              </Grid>
            </Grid>
            {overview && (
              <Grid container className={classes.containerDetails}>
                <Grid item xs={12} sm={12} md={12} lg={11}>
                  <>
                    <h3 className={classes.h3Movie}>
                      {languagePage === "pt-BR" ? "SINOPSE" : "SYNOPSIS"}
                    </h3>
                    <Typography className={classes.pMovie}>
                      {overview}
                    </Typography>
                  </>
                </Grid>
              </Grid>
            )}

            <Grid container className={classes.containerDetails}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                {genres && (
                  <Grid item>
                    <>
                      <h3 className={classes.h3Movie}>
                        {languagePage === "pt-BR" ? "GÊNEROS" : "GENRES"}
                      </h3>
                      <p className={classes.pMovie}>
                        {getGernesfromArrytostring(genres)}
                      </p>
                    </>
                  </Grid>
                )}
                <Grid item>
                  {casts && (
                    <>
                      <h3 className={classes.h3Movie}>
                        {languagePage === "pt-BR"
                          ? "ATORES PRINCIPAIS"
                          : "MAIN ACTORS"}
                      </h3>
                      <p className={classes.pMovie}>
                        {getActorsfromArraytoString(casts)}
                      </p>
                    </>
                  )}
                </Grid>
                <Grid item>
                  {crews && (
                    <>
                      <h3 className={classes.h3Movie}>
                        {languagePage === "pt-BR" ? "DIRETOR" : "DIRECTOR"}
                      </h3>
                      <p className={classes.pMovie}>
                        {getCrewsfromArrytostring(crews)}
                      </p>
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                className={classes.containerTrailer}
              >
                <iframe
                  id={`${videos?.key}`}
                  name={`${videos?.key}`}
                  type="text/html"
                  title={`${videos?.name}`}
                  /*  width="440"
                  height="240" */
                  src={videos?.src}
                  frameBorder="0"
                  allowFullScreen
                  className={classes.trailerMovie}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  containerInfoDetailsMovie: {
    display: "flex",
    flexDirection: "row",
  },
  containerPoster: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "300px",
      height: "450px",
      marginTop: "24px",
    },
  },
  titleMovie: {
    "& h2": {
      color: "white",
      fontFamily: "AllOverAgain",

      fontSize: "25px",
      fontWeight: "normal",
      "& span": {
        margin: "0px 0px 0px 5px",
        fontSize: "20px",
      },
    },
  },
  detailsMovie: {
    /*  marginTop: "24px", */

    display: "flex",
    /*  flexDirection: "row", */
  },
  detailsinfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  detailsInfoMovie: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(1),

    "& p": {
      fontWeight: "700",
      marginLeft: theme.spacing(3),
      lineHeight: "36px",
      color: "#fff",
      fontSize: "14px",
    },
    "& svg": {
      fontSize: "30px",
      marginLeft: theme.spacing(2),
      color: "#fff",
    },
  },
  containerDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    "& p": {
      color: "#fff",
      fontSize: "16px",
      marginTop: "-15px",
      textAlign: "justify-all",
      fontWeight: "500",
    },
    "& h3": {
      color: "#fff",
      fontSize: "18px",
      textTransform: "capitalize",
      fontWeight: "800",
    },
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    background: "#FFFFFC",
    height: 28,
    margin: 4,
  },
  blurred: {
    position: "absolute",
    filter: "blur(50px)",
  },
  wrapper: {
    width: "300px",
    margin: "0 auto",
    position: "relative",
  },
  cover: {
    position: "relative",
  },
  containerTrailer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trailerMovie: {
    width: "440px",
    height: "240px",
    marginTop: "10px",
  },

  /*  Mobile Version */

  [theme.breakpoints.down("xs")]: {
    containerTrailer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    trailerMovie: {
      width: "340px",
      height: "220px",
      margin: "10px 0 10px 0",
      padding: "5px",
    },
    pMovie: {
      fontSize: "10px",
    },
  },

  [theme.breakpoints.down(715)]: {
    detailsInfoMovie: {
      display: "flex",
      flexDirection: "column !important",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: theme.spacing(1),
      /* padding: theme.spacing(3), */
      "& hr": {
        display: "none",
      },
    },
    containerDetails: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& > p": {
        textAlign: "justify !important",
      },
      "& p": {
        color: "#fff",
        fontSize: "18px",
        marginTop: "-15px",
        textAlign: "center",
        fontWeight: "500",
      },
      "& h3": {
        color: "#fff",
        fontSize: "20px",
        textTransform: "capitalize",
        fontWeight: "800",
        textAlign: "center",
      },
    },
  },

  [theme.breakpoints.down("md")]: {
    containerInfoDetailsMovie: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    detailsMovie: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    titleMovie: {
      textAlign: "center",
    },
    detailsinfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    detailsInfoMovie: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: theme.spacing(1),
      /* padding: theme.spacing(3), */

      "& p": {
        fontWeight: "700",
        marginLeft: theme.spacing(3),
        lineHeight: "36px",
        color: "#fff",
        fontSize: "16px",
      },
      "& svg": {
        fontSize: "30px",
        marginLeft: theme.spacing(2),
        color: "#fff",
      },
    },
    containerDetails: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& > p": {
        textAlign: "justify !important",
      },
      "& p": {
        color: "#fff",
        fontSize: "18px",
        marginTop: "-15px",
        textAlign: "center",
        fontWeight: "500",
      },
      "& h3": {
        color: "#fff",
        fontSize: "20px",
        textTransform: "capitalize",
        fontWeight: "800",
        textAlign: "center",
      },
    },
  },
  [theme.breakpoints.down("lg")]: {
    trailerMovie: {
      width: "340px",
      height: "200px",
    },
  },
}));

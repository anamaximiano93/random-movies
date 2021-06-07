import React, { useState } from "react";
import {
  useTheme,
  Grid,
  IconButton,
  Divider,
  makeStyles,
} from "@material-ui/core";

import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ActorsItem from "./ActorsItem";
import { useSelector } from "react-redux";

export default function Actors({ casts, crews }) {
  const theme = useTheme();
  const languagePage = useSelector((state) => state);
  const classes = useStyles();

  const [ExpandMoreOrLess, setExpandMoreOrLess] = useState("none");

  const handleExpandChange = () => {
    if (ExpandMoreOrLess === "none") {
      setExpandMoreOrLess("block");
    } else {
      setExpandMoreOrLess("none");
    }
  };

  return (
    <>
      <Grid container className={classes.containerItensCast}>
        <Grid item>
          <h2>{languagePage === "pt-BR" ? "ELENCO" : "CAST"}</h2>
        </Grid>

        <Grid className={classes.castContainer} container>
          {casts.map((avatar, index) => {
            if (index < 8) {
              return (
                <ActorsItem
                  avatar={avatar}
                  ExpandMoreOrLess={"block"}
                  key={index}
                />
              );
            } else {
              return (
                <ActorsItem
                  avatar={avatar}
                  ExpandMoreOrLess={ExpandMoreOrLess}
                  key={index}
                />
              );
            }
          })}

          <Grid
            container
            style={{
              display: `${
                casts.length === 8 || casts.length < 8 ? "none" : ""
              }`,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              aria-label="Expandir Atores"
              component="span"
              onClick={handleExpandChange}
              size="medium"
            >
              {ExpandMoreOrLess === "none" ? (
                <ExpandMoreRoundedIcon style={{ fontSize: "45px" }} />
              ) : (
                <ExpandLessRoundedIcon style={{ fontSize: "45px" }} />
              )}
            </IconButton>
          </Grid>

          <Divider
            style={{
              borderColor: "rgba(34,34,34, 0.1)",
              width: "100%",
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          />
          {crews.map((avatar, index) => {
            return (
              <ActorsItem
                avatar={avatar}
                ExpandMoreOrLess={"block"}
                key={index}
              />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  castContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    textAlign: "center",

    //  margin: "0px 15px 0px 15px",
    /*   margin: `0px ${theme.spacing(2)}px 0px ${theme.spacing(2)}px`, */
    // padding: theme.spacing(1),
  },
  containerItensCast: {
    "& h2": {
      fontSize: "2rem",
      //prettier-ignore
      margin: `${theme.spacing(4)}px 0px ${theme.spacing(4)}px ${theme.spacing(5)}px`,
    },
  },

  /* **mobile version** */

  [theme.breakpoints.down("sm")]: {
    castContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      //  margin: "0px 15px 0px 15px",
      padding: theme.spacing(2),
    },
    containerItensCast: {
      //prettier-ignore
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // justifyContent: "center",
      "& h2": {
        textAlign: "center !important",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    castContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      //  margin: "0px 15px 0px 15px",
      textAlign: "center",

      padding: theme.spacing(5),
      "& div": {
        alignItems: "flex-start !important",
      },
    },
  },
}));

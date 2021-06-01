import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "../assets/css/fonts.css";

const useStyles = makeStyles((theme) => ({
  containerPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "75vh",
    color: theme.palette.primary.main,

    "& h1": {
      fontSize: 120,
      fontFamily: "AllOverAgain",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& span": {
        fontSize: 70,
      },
    },
  },
}));

export default function NoMatch() {
  const classes = useStyles();
  const language = useSelector((state) => state);
  return (
    <div className={classes.containerPage}>
      <h1>
        404
        <span>
          {language === "pt-BR" ? "PÁGINA NÃO ENCONTRADA" : "PAGE NOT FOUND"}
        </span>
      </h1>
    </div>
  );
}

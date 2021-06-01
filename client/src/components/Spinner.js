import React from "react";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SpinnerSvg from "../assets/icon/SpinnerWhiteSmall.svg";
import { useSelector } from "react-redux";

export default function Spinner() {
  const languagePage = useSelector((state) => state);
  const classes = useStyles();
  return (
    <Backdrop className={classes.containerBackdrop} open={true}>
      <div className={classes.spinner}>
        {/*   <CircularProgress
          //className={{ svg: classes.pacMAN }}
          style={{ width: "70px", height: "70px", color: "white" }}
          disableShrink
        ></CircularProgress> */}
        <img src={SpinnerSvg} alt={"spinnerTime"} />
        <p>
          {languagePage === "pt-BR"
            ? "Aguarde um Momento..."
            : "Wait a moment..."}
        </p>
      </div>
    </Backdrop>
  );
}
const useStyles = makeStyles((theme) => ({
  containerBackdrop: {
    zIndex: 99,
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // background: "red",
    /*  height: "100vh",
    width: "100wh", */
    color: "#fff",
    "& p": {
      fontSize: theme.spacing(6),
      fontWeight: "500",
      margin: "auto",
      textAlign: "center",
    },
  },
}));

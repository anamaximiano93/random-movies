import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import HeartIcon from "@material-ui/icons/Favorite";
import CopyrightIcon from "@material-ui/icons/Copyright";
import tmdb from "./../assets/images/tmdb01 1.svg";
import { useSelector } from "react-redux";

export default function Footer() {
  const classes = useStyles();
  const languagePage = useSelector((state) => state);

  const getYear = () => {
    let data = new Date();
    return data.getFullYear();
  };

  return (
    <div className={(classes.html, classes.body)}>
      <div className={classes.footer}>
        <footer style={{ textAlign: "center", lineHeight: "30px" }}>
          <Typography>
            Copyright
            <span role="img" aria-label="copy">
              <CopyrightIcon style={{ fontSize: "15px" }} />
            </span>
            2020/{getYear()} - Random Movies
          </Typography>
          <Typography>
            {languagePage === "pt-BR"
              ? " Dados Obtidos na API"
              : "Data obtained from the API"}

            <a href="https://www.themoviedb.org/" target="blank">
              <img
                style={{ verticalAlign: "middle", margin: "0px 2px 0px 2px" }}
                src={tmdb}
                alt="TMDb"
                title="TMDb"
              />
            </a>
          </Typography>

          <Typography>
            {languagePage === "pt-BR" ? " Feito com" : "developed with"}

            <span role="img" aria-label="coração">
              <HeartIcon color="error" style={{ fontSize: "20PX" }} />
            </span>
            {languagePage === "pt-BR" ? "por" : "for"}
            <a
              style={{
                color: "#fff",
                textDecoration: "none",
                marginLeft: "4px",
              }}
              href="https://github.com/anamaximiano93"
              target="blank"
            >
              Ana Maximiano
            </a>
          </Typography>
        </footer>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    height: 114,
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: theme.spacing(4),
    "& p": {
      "& span": {
        margin: "0px 5px 0px 5px",
      },
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gridRowStart: 2,
    gridRowEnd: 3,
  },
}));

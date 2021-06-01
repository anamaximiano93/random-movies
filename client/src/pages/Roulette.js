import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Box,
  makeStyles,
  useTheme,
  Input,
  Chip,
  Button,
  useMediaQuery,
  InputLabel,
} from "@material-ui/core";
import api from "../api/api";
import Spinner from "../components/Spinner";
import { getCertification } from "../Helper/certification";

import { useSelector } from "react-redux";
import AlertToast from "../components/AlertToast";
import ModalRoullete from "../components/ModalRoullete";
//Modal.setAppElement("#root");

function valuetext(value) {
  return value;
}
function valuetextRatings(value) {
  return value;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Roulette() {
  const classes = useStyles();
  const theme = useTheme();

  const languagePage = useSelector((state) => state);

  const [yearValue, setyearValue] = useState(new Date().getFullYear());
  const [ratingsValue, setratingsValue] = useState(5.5);
  const [genresValues, setgenresValues] = useState([]);
  const [genres, setgenres] = useState([]);
  const [openSpinner, setopenSpinner] = useState(false);
  const [movieChoose, setmovieChoose] = useState({});
  const [openModal, setopenModal] = useState(false);
  const [certificationState, setcertificationState] = useState([]);
  const [snackMessage, setsnackMessage] = useState("");
  const [snackOpen, setsnackOpen] = useState(false);
  const [snackTypeMessage, setsnackTypeMessage] = useState("info");

  const isMobile = useMediaQuery(
    theme.breakpoints.down("xs") && theme.breakpoints.down("sm")
  );

  useEffect(() => {
    // title page
    document.title = "Roulette" + " | " + process.env.REACT_APP_NAME;

    const getGenre = async () => {
      const { data } = await api.get(`/genres/${languagePage}`);
      setgenresValues(data);
    };
    getGenre();
  }, [languagePage]);

  const handleValueYear = (_, value) => {
    setyearValue(value);
  };

  const handleValueRatings = (_, value) => {
    setratingsValue(value);
  };

  const handleChangeGenre = (event) => {
    const value = event.target.value;

    //prettier-ignore
    if ((value.length-1) === 5) return;

    setgenres(value);
  };

  const handleClickRandomMovies = async () => {
    /* verfica se foi definido um genero */
    if (genres.length === 0) {
      setsnackMessage(
        `Escolher pelo menos um Gênero para Roleta, por gentileza!!!`
      );
      setsnackOpen(true);
      setsnackTypeMessage("info");
      return;
    }

    setopenSpinner(true);

    const gerne = genres.map((item) => {
      return item.id;
    });

    const random = {
      year: yearValue,
      ratings: ratingsValue,
      gerne,
    };

    try {
      const { data } = await api.post(`roulette/${languagePage}`, random);

      if (isMobile) {
        window.location.replace(`/detail/movie/${data.idTmDB}`);
        return;
      }

      setTimeout(() => {
        setmovieChoose(data);
        setcertificationState(
          getCertification(data.certification, languagePage)
        );
        setopenSpinner(false);
        setopenModal(true);
      }, 2000);
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        setopenSpinner(false);
        setsnackMessage(`code: ${status} :: ${data.message}`);
        setsnackOpen(true);
        setsnackTypeMessage("warning");
      } else {
        setopenSpinner(false);
        setsnackMessage(`${error}`);
        setsnackOpen(true);
        setsnackTypeMessage("error");
      }
    }
  };

  return openSpinner === true ? (
    <Spinner />
  ) : (
    <>
      <ModalRoullete
        movieChoose={movieChoose}
        open={openModal}
        certificationState={certificationState}
        setopenModal={setopenModal}
        handleClickRandomMovies={handleClickRandomMovies}
      />

      <div className={classes.containerBox}>
        <div className={classes.TitlePage}>
          <h2>
            {languagePage === "pt-BR" ? "Roulette Filmes" : "Roulette Movies"}
          </h2>
          <AlertToast
            text={snackMessage}
            open={snackOpen}
            handleCloseIcon={() => setsnackOpen(false)}
            handleClose={() => setsnackOpen(false)}
            type_={snackTypeMessage}
          />
          <Box>
            <Paper
              className={classes.containerGridPaper}
              style={{ display: openModal ? "none" : "block" }}
            >
              <Grid container className={classes.containerGridItems}>
                {/* YEAR */}
                <Grid item>
                  <Paper className={classes.paperBoxItem}>
                    <Box p={5} m={2} className={classes.boxGridItem}>
                      <Typography
                        id="yearMovies"
                        gutterBottom
                        className={classes.title}
                      >
                        {languagePage === "pt-BR"
                          ? "Ano de Lançamento"
                          : "Release year"}
                      </Typography>
                      <Slider
                        value={yearValue}
                        style={{ marginTop: "25px" }}
                        defaultValue={parseInt(new Date().getFullYear())}
                        getAriaValueText={valuetext}
                        aria-labelledby="yearMovies"
                        onChange={handleValueYear}
                        step={1}
                        marks={[
                          { value: 1900, label: "1900" },
                          {
                            value: parseInt(new Date().getFullYear()),
                            label: parseInt(
                              new Date().getFullYear()
                            ).toString(),
                          },
                        ]}
                        min={1900}
                        max={parseInt(new Date().getFullYear())}
                        valueLabelDisplay="on"
                      />
                    </Box>
                  </Paper>
                </Grid>
                {/* YEAR */}
                {/* GENERES */}
                <Grid item>
                  <Paper className={classes.paperBoxItem}>
                    <Box p={5} m={2} className={classes.boxGridItem}>
                      <Typography
                        id="yearMovies"
                        gutterBottom
                        className={classes.title}
                      >
                        {languagePage === "pt-BR" ? "Gêneros" : "Genres"}
                      </Typography>
                      <FormControl variant="outlined">
                        <InputLabel id="demo-mutiple-chip-label">
                          {languagePage === "pt-BR"
                            ? "Escolha um gêneros"
                            : "Choose a genre"}
                        </InputLabel>
                        <Select
                          autoWidth={true}
                          id="demo-mutiple-chip"
                          style={{ width: 260 }}
                          value={genres}
                          onChange={handleChangeGenre}
                          multiple
                          // multiline
                          input={<Input id="select-multiple-chip" />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => {
                                return (
                                  <Chip
                                    key={value.id}
                                    label={value.name}
                                    className={classes.chip}
                                  />
                                );
                              })}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="" disabled>
                            None
                          </MenuItem>
                          {genresValues.map((item, index) => {
                            return (
                              <MenuItem key={item.id} value={item}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Paper>
                </Grid>
                {/* GENERES */}
                {/* RATINGS */}
                <Grid item>
                  <Paper className={classes.paperBoxItem}>
                    <Box p={5} m={2} className={classes.boxGridItem}>
                      <Typography
                        id="ratingsMovies"
                        gutterBottom
                        className={classes.title}
                      >
                        Ratings
                      </Typography>
                      <Slider
                        value={ratingsValue}
                        style={{ marginTop: "25px" }}
                        defaultValue={5.5}
                        getAriaValueText={valuetextRatings}
                        aria-labelledby="ratingsMovies"
                        step={0.5}
                        onChange={handleValueRatings}
                        marks={[
                          { value: 1, label: "1" },
                          { value: 10, label: "10" },
                        ]}
                        min={1}
                        max={10}
                        valueLabelDisplay="on"
                      />
                    </Box>
                  </Paper>
                </Grid>
                {/* RATINGS */}
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={handleClickRandomMovies}
                    variant="contained"
                    className={classes.buttonBoxes}
                  >
                    {languagePage === "pt-BR" ? "Girar" : "To spin"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  containerBox: {
    display: "flex",
    alignItems: "last baseline",
    justifyContent: "center",
    height: "75vh",
  },
  TitlePage: {
    "& h2": {
      color: theme.palette.primary.main,
      textAlign: "left",
      fontSize: "30px",
      marginLeft: theme.spacing(4),
    },
  },
  containerGridPaper: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boxGridItem: { width: 300, height: 150 },
  title: {
    fontWeight: "bold",
    fontSize: "1.5em",
  },
  paperBoxItem: {
    padding: "2px",
    margin: "5px",
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  buttonBoxes: {
    background: `red`,
    color: "#fff",
    border: "3px solid #fff",
    borderRadius: "75%",
    fontSize: "20px",
    padding: "20px",
    margin: "20px",
    transition: "background 200ms, color 200ms",
    "&:hover": {
      background: "#fff",
      color: "red",
      border: "3px solid red",
    },
  },

  /* buttonsColors: {
    background: "#3E1929",
    color: "#fff",
    "&:hover": {
      background: "#613A4B",
      color: theme.palette.secondary.main,
    },
  }, */
  /*  buttonsModal: {
    "& > *": {
      margin: theme.spacing(2),
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  }, */

  /* mobile version*/
  [theme.breakpoints.down("xs")]: {
    containerBox: { height: "auto" /* "145vh" */ },
    TitlePage: {
      "& h2": {
        textAlign: "center",
      },
    },
    containerGrid: {
      margin: "auto",
    },
    boxPaperGrid: {},
    containerGridItems: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  [theme.breakpoints.down("sm")]: {
    container: { marginBottom: "25px" },
    TitlePage: {
      "& h2": {
        textAlign: "center",
      },
    },
    containerGridPaper: {
      padding: theme.spacing(1),
      textAlign: "center",
      margin: "auto",
    },
    boxGridItem: { width: 280, height: 150 },
  },

  [theme.breakpoints.down("1025")]: {
    containerBox: { height: "auto", marginBottom: "25px" },
    TitlePage: {
      "& h2": {
        textAlign: "center",
      },
    },
    containerGridItems: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  [theme.breakpoints.down("md")]: {
    containerBox: {
      marginBottom: "25px",
    },
    containerGridItems: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    containerGridPaper: {
      margin: `0 ${theme.spacing(5)}px 0 ${theme.spacing(5)}px`,
    },
  },
}));

import { Button, Dialog, IconButton, makeStyles } from "@material-ui/core";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import TelegramIcon from "@material-ui/icons/Telegram";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Details from "./Details";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ModalRoullete({
  movieChoose,
  open,
  certificationState,
  handleClickRandomMovies,
  setopenModal,
}) {
  const classes = useStyles();
  const languagePage = useSelector((state) => state);

  const handleClose = () => {
    setopenModal(false);
  };

  const rouletteAgain = () => {
    handleClickRandomMovies();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"body"}
      aria-labelledby="scroll-roulette"
      aria-describedby="scroll-roulette-description"
      fullWidth={true}
      maxWidth={"lg"}
      // fullScreen={true}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }} />
        <IconButton
          color="primary"
          aria-label="close modal"
          onClick={() => handleClose()}
          size="medium"
        >
          <CloseIcon />
        </IconButton>
      </div>

      {/*  <DialogContent> */}
      <div>
        <Details
          details={movieChoose} //228CDB //D10000
          certification={certificationState}
        />
      </div>
      {/*  </DialogContent> */}
      <div className={classes.buttonsModal}>
        <Button
          variant="contained"
          className={classes.buttonsColors}
          startIcon={<TrackChangesIcon />}
          onClick={rouletteAgain}
        >
          {languagePage === "pt-BR" ? "Roletar Novamente" : "Roulette Again"}
        </Button>
        <Button
          variant="contained"
          className={classes.buttonsColors}
          startIcon={<TelegramIcon />}
          component={Link}
          to={`/detail/movie/${movieChoose.idTmDB}`}
        >
          {languagePage === "pt-BR" ? "Ir para pagina" : "Go to page"}
        </Button>
        <Button
          variant="contained"
          className={classes.buttonsColors}
          startIcon={<CloseIcon />}
          onClick={() => handleClose()}
        >
          {languagePage === "pt-BR" ? "Fechar" : "Close"}
        </Button>
      </div>
    </Dialog>
  );
}
const useStyles = makeStyles((theme) => ({
  buttonsColors: {
    background: "#3E1929",
    color: "#fff",
    "&:hover": {
      background: "#613A4B",
      color: theme.palette.secondary.main,
    },
  },
  buttonsModal: {
    "& > *": {
      margin: theme.spacing(2),
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));

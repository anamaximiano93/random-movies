import React from "react";
import {
  useTheme,
  Grid,
  Card,
  Avatar,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

export default function ActorsItem({ avatar, ExpandMoreOrLess }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid
      item
      className={classes.card}
      style={{
        display: ExpandMoreOrLess,
      }}
      key={(avatar.id + avatar.name).replace(" ", "") + Math.random(10 * 100)}
    >
      <Card className={classes.cardActor}>
        <Avatar
          alt={avatar.name}
          src={avatar.profile_path}
          title={avatar.name}
          style={{
            width: "100px",
            height: "100px",
            margin: theme.spacing(2),
          }}
        />
        <div className={classes.detailsActor}>
          <CardContent className={classes.contentActor}>
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "bold",
              }}
              component="h6"
              variant="h6"
            >
              {avatar.name}
            </Typography>
            <Typography color="textSecondary">
              {avatar.character !== undefined ? avatar.character : avatar.job}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
    flexWrap: "wrap",
    alignContent: "center",
    margin: theme.spacing(1),
  },

  cardActor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start ",
    alignItems: "start ",
    margin: theme.spacing(2),
    "& img": {
      filter: "brightness(100%)",
    },
    width: "290px",
  },
  detailsActor: {
    margin: "0px",
  },
  contentActor: {
    margin: "0px",
  },
}));

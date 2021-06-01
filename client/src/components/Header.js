import React, { useState, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Button,
  FormControl,
  Select,
  Grid,
  Paper,
  InputBase,
  Divider,
  Menu,
  Dialog,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import LogoImg from "../assets/images/logo.svg";
import BrImg from "../assets/icon/brasil.svg";
import EnImg from "../assets/icon/estados-unidos.svg";

import language from "../Helper/language";

import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import SadFace from "@material-ui/icons/SentimentVeryDissatisfied";

import { Link, NavLink } from "react-router-dom";
import AlertToast from "./AlertToast";

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { onSearchMode } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down(1836));

  const languagePage = useSelector((state) => state);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(false);

  const [search, setsearch] = useState("");
  const [searchType, setsearchType] = useState("title");

  const [snackMessage, setsnackMessage] = useState("");
  const [snackOpen, setsnackOpen] = useState(false);

  const [openAuthentication, setopenAuthentication] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", handleButtonSearchKey);
    return () => {
      document.removeEventListener("keypress", handleButtonSearchKey);
    };
  });

  const toggleLanguage = (language) => {
    return {
      type: "LANGUAGE_MODE",
      language,
    };
  };

  const handleChangeLanguageMode = (event) => {
    const value = event.target.value;
    dispatch(toggleLanguage(value));
  };

  const handleChangeTypeSearch = (event) => {
    const value = event.target.value;
    setsearchType(value);
  };

  const handleButtonSearch = () => {
    if (search.length === 0) {
      setsnackMessage(
        "Por favor escrever algum titulo de filme ou nome de algum ator"
      );
      setsnackOpen(true);
    } else {
      setsearch("");
      onSearchMode({ search, searchType });
      props.history.push(`/search/?s=${search}`);
    }
  };

  const handleButtonSearchKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleButtonSearch();
    }
  };

  const handleInputTextChange = (event) => {
    setsearch(event.target.value);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonAuthentication = () => {
    setopenAuthentication(!openAuthentication);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <AlertToast
          text={snackMessage}
          open={snackOpen}
          handleCloseIcon={() => setsnackOpen(false)}
          handleClose={() => setsnackOpen(false)}
          type_={"info"}
        />
        <Toolbar>
          <Grid
            container
            justify="center"
            className={classes.header}
            spacing={2}
          >
            <Grid xs={12} sm={12} md={12} lg={4} item>
              {/* menu  */}
              <Grid container className={classes.menuItens}>
                <div>
                  <Link to={"/"}>
                    <img
                      src={LogoImg}
                      className={classes.logo}
                      alt="Random Movies Logo"
                    />
                  </Link>
                </div>
                <div className={classes.Menu}>
                  {isMobile ? (
                    <div>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        className={classes.iconMobile}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {languagePage === "pt-BR"
                          ? language[0].Menu.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  variant="contained"
                                  color="primary"
                                  component={Link}
                                  className={classes.LinkMenu}
                                  to={item.pageUrl}
                                  onClick={handleClose}
                                >
                                  {item.MenuItem}
                                </MenuItem>
                              );
                            })
                          : language[1].Menu.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  variant="contained"
                                  color="primary"
                                  className={classes.LinkMenu}
                                  component={Link}
                                  to={item.pageUrl}
                                  onClick={handleClose}
                                >
                                  {item.MenuItem}
                                </MenuItem>
                              );
                            })}
                      </Menu>
                    </div>
                  ) : languagePage === "pt-BR" ? (
                    language[0].Menu.map((item, index) => {
                      return (
                        <Button
                          exact
                          key={index}
                          variant="contained"
                          color="primary"
                          component={NavLink}
                          className={classes.LinkMenu}
                          to={item.pageUrl}
                          activeClassName={classes.activeMenu}
                        >
                          {item.MenuItem}
                        </Button>
                      );
                    })
                  ) : (
                    language[1].Menu.map((item, index) => {
                      return (
                        <Button
                          exact
                          key={index}
                          variant="contained"
                          color="primary"
                          className={classes.LinkMenu}
                          component={NavLink}
                          to={item.pageUrl}
                          activeClassName={classes.activeMenu}
                        >
                          {item.MenuItem}
                        </Button>
                      );
                    })
                  )}
                </div>
              </Grid>
              {/* menu  */}
            </Grid>
            {/* search */}
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              className={classes.searchGrid}
            >
              <Grid container className={classes.searchGridInner}>
                <Paper component="form" className={classes.searchPaper}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      native
                      value={searchType}
                      className={classes.selectTypeSearch}
                      onChange={handleChangeTypeSearch}
                    >
                      <option value="title">
                        {languagePage === "pt-BR" ? "Título" : "Title"}
                      </option>
                      <option value="actors">
                        {languagePage === "pr-BR" ? "Atores" : "Actors"}
                      </option>
                    </Select>
                  </FormControl>
                  <InputBase
                    className={classes.inputSearch}
                    placeholder={
                      languagePage === "pt-BR" ? "Pesquisar" : "Search"
                    }
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleInputTextChange}
                    value={search}
                  />
                  <IconButton
                    className={classes.iconButtonSearch}
                    aria-label="search"
                    onClick={handleButtonSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <FormControl
                  variant="outlined"
                  className={classes.formControlLanguage}
                >
                  <Select
                    autoWidth={true}
                    className={classes.selectTyoelanguage}
                    id="demo-simple-select-filled"
                    value={languagePage}
                    onChange={handleChangeLanguageMode}
                  >
                    <MenuItem value={"pt-BR"}>
                      BR
                      <img
                        src={BrImg}
                        className={classes.languageImg}
                        alt={"pt-BR"}
                      />
                    </MenuItem>
                    <MenuItem value={"en-US"}>
                      EN
                      <img
                        src={EnImg}
                        className={classes.languageImg}
                        alt={"en-US"}
                      />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              className={classes.account}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                className={classes.buttonAccountAction}
                onClick={handleButtonAuthentication}
              >
                Login
              </Button>
              <Divider className={classes.divider} orientation="vertical" />
              <Button
                variant="outlined"
                className={classes.buttonAccountAction}
                onClick={handleButtonAuthentication}
              >
                Sing Up
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Dialog
        onClose={handleButtonAuthentication}
        aria-labelledby="simple-dialog-Authentication"
        open={openAuthentication}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "24px",
          }}
        >
          <DialogTitle id="simple-dialog-Authentication">
            <SadFace style={{ fontSize: "50px" }} />
          </DialogTitle>
          <Typography style={{ fontSize: "25px" }}>
            {languagePage === "pt-BR"
              ? "Desculpe,  mas não é possivel fazer isso ainda"
              : "Sorry, but it is not possible to do that yet"}
          </Typography>
        </div>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuItens: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 210,
    height: 114,
    marginLeft: theme.spacing(4),
  },
  iconMobile: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "& svg": {
      fontSize: theme.spacing(6),
    },
    "&:hover": {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  Menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  LinkMenu: {
    marginLeft: theme.spacing(2),
    "&:hover": {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      transition: "all ease 0.2s",
    },
  },
  activeMenu: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  searchGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchGridInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchPaper: {
    display: "inline",
  },
  inputSearch: {
    marginLeft: theme.spacing(2),
  },
  iconButtonSearch: { height: 40, flexGrow: 1 },
  selectTypeSearch: {
    height: 40,
  },
  formControlLanguage: {
    background: "#FFFFFC",
    borderRadius: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },

  selectTyoelanguage: {
    height: 40,
  },

  languageImg: {
    width: 30,
    height: 20,
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    background: "#FFFFFC",
    height: 28,
    margin: 4,
  },
  account: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAccountAction: {
    background: "#FFFFFC",
    borderColor: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      transition: "all ease 0.2s",
    },
  },

  [theme.breakpoints.down("xs")]: {
    account: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center !important",
      alignItems: "center",
      marginBottom: "5px",
    },
    searchGridInner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center !important",
      justifyContent: "center !important",
      marginBottom: "5px",
    },
    menuItens: {
      display: "flex",
      flexDirection: "row-reverse !important",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
  },

  [theme.breakpoints.down("sm")]: {
    menuItens: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    logo: {
      width: 180,
      height: 80,
    },
    iconButtonSearch: {
      fontSize: "5px",
      flexGrow: 1,
    },
    inputSearch: {
      width: "50%",
    },
    searchGridInner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  [theme.breakpoints.down("md")]: {
    menuItens: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    logo: {
      width: 180,
      height: 80,
    },
    searchPaper: { marginBottom: "5px" },
    searchGridInner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "start",
      marginBottom: "5px",
    },

    header: { justifyContent: "space-between" },
  },
}));

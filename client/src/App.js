import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

import Header from "./components/Header";
import Home from "./pages/Home";
import Roulette from "./pages/Roulette";

import Footer from "./components/Footer";
import PageMovie from "./pages/PageMovie";
import PageMovieList from "./pages/PageMovieList";
import PageRecommended from "./pages/PageRecommended";
import PageSearch from "./pages/PageSearch";
import PageNotFound from "./pages/NoMatch";
export default function App() {
  const [searchMovie, setsearchMovie] = useState(
    window.location.search.slice(3, window.location.search.length)
  );
  const [searchMovieType, setsearchMovieType] = useState("title");

  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      primary: {
        main: "#1c0619",
      },
      secondary: {
        main: "#FFFFFC",
      },
    },
  });
  const handleSearch = (value) => {
    const { search, searchType } = value;
    setsearchMovie(search);
    setsearchMovieType(searchType);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route
          path="/"
          render={(props) => (
            <Header
              {...props}
              onSearchMode={handleSearch}
              searchMode={searchMovie}
              searchTypeMode={searchMovieType}
            />
          )}
          onSearchMode={handleSearch}
          searchMode={searchMovie}
          searchTypeMode={searchMovieType}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path={"/roulette"}
            render={(props) => <Roulette {...props} />}
          />
          <Route
            exact
            path={"/:route/:route_page"}
            render={(props) => <PageMovieList {...props} />}
          ></Route>
          <Route
            exact
            path={"/recommendations/:idTmdb/:route_page"}
            render={(props) => <PageRecommended {...props} />}
          ></Route>
          <Route
            exact
            path={"/detail/movie/:idTmdb"}
            render={(props) => <PageMovie {...props} />}
          ></Route>
          <Route
            exact
            path={"/search/"}
            render={(props) => (
              <PageSearch
                {...props}
                searchType={searchMovieType}
                searchMovie={searchMovie}
              />
            )}
            searchType={searchMovieType}
            searchMovie={searchMovie}
          ></Route>
          <Route path="/NotFound" component={PageNotFound} />
          <Redirect from="*" to="/NotFound" />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from "react";
import api from "../api/api";

//import { useTheme } from "@material-ui/core/styles";
import Spinner from "../components/Spinner";
import MovieListRow from "../components/MovieListRow";
import { useSelector } from "react-redux";

const MovieHomeArray = [
  {
    title_page: "Top da Semana",
    original_title_page: "Trending of the Week",
    link: "/trending_week",
    results: [],
  },
  {
    title_page: "Populares",
    original_title_page: "Popular",
    link: "/popular",
    results: [],
  },
  {
    title_page: "Os Em Breves",
    original_title_page: "Up Coming",
    link: "/up_coming",
    results: [],
  },
  {
    title_page: "Os Mais Votados",
    original_title_page: "Top Rated",
    link: "/top_rated",
    results: [],
  },
];

export default function Home() {
  // console.log(props);
  const [MovieHome, setMovieHome] = useState([]);
  //const [languagePage,setLanguagePage] =useState(language);

  const languagePage = useSelector((state) => state);

  const dataMovie = async () => {
    const value = new Date();

    let newObj = [];
    setMovieHome(newObj);

    for (const key in MovieHomeArray) {
      if (MovieHomeArray.hasOwnProperty(key)) {
        const element = MovieHomeArray[key];

        element.results = [];

        const { data } = await api.get(`${element.link}/${languagePage}`);

        element.results.push(...data.results);
      }
    }
    // console.log(MovieHomeArray)

    const results = {
      data: value.toLocaleDateString("pt-BR"),
      language_selected: languagePage,
      movies: MovieHomeArray,
    };

    setMovieHome([...MovieHomeArray]);

    localStorage.setItem("movieslocal", JSON.stringify(results));
    //window.location.reload()
  };

  useEffect(() => {
    // title page
    document.title =
      (languagePage === "pt-BR" ? "Inicio" : "Home") +
      " | " +
      process.env.REACT_APP_NAME;

    localStorageMovies();
  }, [languagePage]);

  const localStorageMovies = () => {
    const value = new Date();
    const dados = localStorage.getItem("movieslocal");
    const result = JSON.parse(dados);
    const languageTest =
      result === null ? languagePage : result.language_selected;

    let newObj = [];
    setMovieHome(newObj);

    if (result === null || languageTest !== languagePage) {
      // localStorage.setItem("movieslocal", null);
      dataMovie();
    } else {
      if (result.data === value.toLocaleDateString("pt-BR")) {
        setMovieHome(result.movies);
      } else {
        dataMovie();
      }
    }
  };

  return (
    /*  <Container fixed>*/
    <>
      {MovieHome.length === 0 && <Spinner />}
      {MovieHome.length > 0 && (
        <>
          {MovieHome.map((item) => {
            return (
              <MovieListRow
                movie={item}
                key={item.title_page}
                // language={languagePage}
                linkPageMovie={`${item.link}/${1}`}
                marginStyles={{ margin: "0px 0px 0px 30px" }}
              />
            );
          })}
        </>
      )}
    </>
    /*  </Container> */
  );
}

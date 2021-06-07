import React, { useState, useEffect } from "react";

import { useTheme } from "@material-ui/core";

import api from "../api/api";
import Spinner from "../components/Spinner";
import MovieListRow from "../components/MovieListRow";
import Actors from "../components/Actors";
import Details from "../components/Details";
import { getCertification } from "../Helper/certification";
import { useSelector } from "react-redux";

export default function PageMovie({ match }) {
  const idTmdb = match.params.idTmdb;
  const theme = useTheme();

  const languagePage = useSelector((state) => state);

  const [MovieDetails, setMovieDetails] = useState({});
  const [certificationState, setcertificationState] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);
  const [recommend, setrecommend] = useState({
    title_page: "Recomendações",
    original_title_page: "Recommendations",
    link: "/recommendations",
    pageMovie: true,
    id: null,
    results: [],
  });
  const [lengthDetails, setlengthDetails] = useState(0);

  useEffect(() => {
    // title page
    const loadDataMovieDetails = async () => {
      try {
        const dataRecommend = await api.post(
          `/recommendations/${languagePage}/${1}`,
          {
            idTmDB: idTmdb,
          }
        );
        const resultsRecommend = await dataRecommend.data;

        recommend.results.push(...resultsRecommend.results);
        recommend.id = idTmdb;

        setrecommend(recommend);

        const dataMovie = await api.get(
          `/movie_details/${languagePage}/${idTmdb}`
        );

        const resultsMovie = await dataMovie.data;
        document.title =
          resultsMovie.results.title + " | " + process.env.REACT_APP_NAME;

        setMovieDetails(resultsMovie.results);
        setcertificationState(
          getCertification(resultsMovie.results.certification, languagePage)
        );
        setTimeout(() => {
          setlengthDetails(Object.keys(resultsMovie.results).length);
        }, 5000);
      } catch (error) {
        const { status, statusText } = error.response;
        seterrorMessage({ status, statusText });
      }
    };
    loadDataMovieDetails();
    return () => {
      setResetStates();
    };
  }, [languagePage, idTmdb, recommend]);

  const setResetStates = () => {
    let newObj = {};
    setMovieDetails(newObj);
    recommend.results.length = 0;
    recommend.id = null;
    setrecommend(recommend);
    setlengthDetails(0);
  };

  return (
    <>
      {errorMessage === null ? (
        <>
          {lengthDetails === 0 && <Spinner />}
          {lengthDetails > 0 && (
            <>
              <Details
                details={MovieDetails}
                certification={certificationState}
              />
              <Actors casts={MovieDetails.casts} crews={MovieDetails.crews} />
            </>
          )}
          <div>
            {recommend.results.length !== 0 ? (
              <MovieListRow
                movie={recommend}
                linkPageMovie={`${recommend.link}/${recommend.id}/${1}`}
                marginStyles={{ margin: "0px 0px 15px 30px" }}
              />
            ) : (
              <h2
                style={{
                  margin: "30px 0px 30px 0px",
                  textAlign: "center",
                  color: theme.palette.primary.main,
                  fontSize: "2rem",
                }}
              >
                {languagePage === "pt-BR"
                  ? "NÃO HÁ RECOMENTADOS PARA ESSE FILME :(".toString()
                  : "THERE ARE NO RECOMMENDED FOR THIS FILM :(".toString()}
              </h2>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
            color: theme.palette.primary.main,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontFamily: "AllOverAgain",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {errorMessage.status}
            <span style={{ fontSize: 70 }}>{errorMessage.statusText}</span>
          </h1>
        </div>
      )}
    </>
  );
}

const { removerAcentos, filterRandomMovies } = require("../helpers/functions");
const { get } = require("axios");

const logger = require("../config/logger.js");

//const PosterDefault = require("../client/src/assets/images/poster_path_default.sgv");

const { API_KEY, OMDB_API_KEY } = process.env;

async function randomMovies(req, res) {
  const language = req.params.language; // pt-BR or en-US
  const { gerne, ratings, year } = req.body; // ( gerne: string, rating: float, year : number (fours numbers))
  try {
    const genres = gerne.length === 1 ? gerne[0].toString() : gerne.join(",");

    const filtered = await filterRandomMovies(
      genres,
      parseInt(year),
      parseFloat(ratings)
    );

    if (filtered.length === 0) {
      logger.info(
        `randomMovies - POST - ${JSON.stringify({
          message: "Não Foi possivel roletar filmes, pelo filtros selecionados",
          filter: `(${genres}), (${year}), (${ratings}), - ${language}`,
        })}`
      );
      res.status(404).send({
        message: "Não Foi possivel roletar filmes, pelo filtros selecionados",
      });
      return;
    }
    // sorteio
    const value = Math.floor(Math.random() * filtered.length);
    const movieChosen = filtered.filter((_, index) => index === value);

    const result = movieChosen[0];

    const resultsData = [
      {
        original_title: result.title,
        idTmDB: result.id,
        poster_path_original: `https://image.tmdb.org/t/p/original${result.poster_path}`,
        vote_average: result.vote_average,
      },
    ];

    const dataRatingsOMDB = await OMDB(resultsData, true);

    const link_finale = `https://api.themoviedb.org/3/movie/${result.id}?api_key=${API_KEY}&language=${language}&append_to_response=videos,casts,release_dates`;

    const dataMovieChosen = await dataMoviesDetails(
      dataRatingsOMDB,
      link_finale
    );

    res.status(200).send(dataMovieChosen);
    logger.info(`POST /randomMovies - ${JSON.stringify(result.id)}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    // res.end();
    res.send({
      message:
        language === "pt-BR"
          ? "Favor entrar em contato com o Desenvoldedor !!!"
          : "Please contact the Developer !!!",
    });
    logger.error(`POST /randomMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// Filmes Populares
async function popularMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;

  try {
    //prettier-ignore
    const page_ = typeof( param) === "undefined" ? `1` : param.trim();

    const link_finale = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page_}`;

    //prettier-ignore
    const { data } = await get(link_finale)

    const { total_results, total_pages, results, page } = await data;

    const resultsData = results.map((item) => {
      return {
        original_title: item.title,
        idTmDB: item.id,
        poster_path_original: item.poster_path,
        vote_average: item.vote_average,
      };
    });

    const resultMovies = await dataMoviesList(
      resultsData,
      link_finale,
      language
    );

    // sorteio para que a home não fique com os mesmo filme em ordem
    for (let i = 0; i < resultMovies.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultMovies[i], resultMovies[j]] = [resultMovies[j], resultMovies[i]];
    }

    const Result = {
      total_results,
      total_pages,
      page,
      results: resultMovies,
    };

    res.send(Result);
    logger.info(`GET /popularMovies - ${page}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /popularMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// Os Mais Votados
async function topRatedMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;

  try {
    const page_ = typeof param === "undefined" ? `1` : param.trim();

    const link_finale = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${language}&page=${page_}&region=BR`;
    //prettier-ignore
    const { data } = await get(link_finale);

    const { total_results, total_pages, results, page } = await data;

    const resultsData = results.map((item) => {
      return {
        original_title: item.title,
        idTmDB: item.id,
        poster_path_original: item.poster_path,
        vote_average: item.vote_average,
      };
    });

    const resultMovies = await dataMoviesList(
      resultsData,
      link_finale,
      language
    );

    const Result = {
      total_results,
      total_pages,
      page,
      results: resultMovies,
    };

    res.send(Result);
    logger.info(`GET /topRatedMovies - ${page}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /topRatedMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// Os Em Breves
async function upComingMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;
  try {
    const page_ = typeof param === "undefined" ? `1` : param.trim();
    const region = language === "pt-BR" ? "BR" : "US";

    const link_finale = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=${language}&page=${page_}&region=${region}`;
    const { data } = await get(link_finale);

    const { total_results, total_pages, results, page } = await data;

    const resultsData = results.map((item) => {
      return {
        original_title: item.title,
        idTmDB: item.id,
        poster_path_original: item.poster_path,
        vote_average: item.vote_average,
      };
    });

    const resultMovies = await dataMoviesList(
      resultsData,
      link_finale,
      language
    );

    const Result = {
      total_results,
      total_pages,
      page,
      results: resultMovies,
    };

    res.send(Result);
    // logger.info(`GET /upComingMovies - ${page}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /upComingMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// Lançamentos
async function nowPlayingMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;

  try {
    const page_ = typeof param === "undefined" ? `1` : param.trim();

    const link_finale = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=${language}&page=${page_}`;
    const { data } = await get(link_finale);

    const { total_results, total_pages, results, page } = await data;

    const resultsData = results.map((item) => {
      return {
        original_title: item.title,
        idTmDB: item.id,
        poster_path_original: item.poster_path,
        vote_average: item.vote_average,
      };
    });

    const resultMovies = await dataMoviesList(
      resultsData,
      link_finale,
      language
    );

    const Result = {
      total_results,
      total_pages,
      page,
      results: resultMovies,
    };

    res.send(Result);
    // logger.info(`GET /nowPlayingMovies - ${page}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /nowPlayingMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// Top's da Semana
async function trendingMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;

  try {
    const page_ = typeof param === "undefined" ? `1` : param.trim();

    const link_finale = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=${language}&page=${page_}`;
    const { data } = await get(link_finale);

    const { total_results, total_pages, results, page } = await data;

    const resultsData = results.map((item) => {
      return {
        original_title: item.title,
        idTmDB: item.id,
        poster_path_original: item.poster_path,
        vote_average: item.vote_average,
      };
    });

    const resultMovies = await dataMoviesList(
      resultsData,
      link_finale,
      language
    );

    const Result = {
      total_results,
      total_pages,
      page,
      results: resultMovies,
    };

    res.send(Result);
    //logger.info(`GET /trendingMovies - ${page}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /trendingMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// Recommendations
async function recommendationsMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;
  const { idTmDB } = req.body;

  try {
    const page_ = typeof param === "undefined" ? "1" : param.trim();
    const link_finale = `https://api.themoviedb.org/3/movie/${idTmDB}/recommendations?api_key=${API_KEY}&language=${language}&page=${page_}`;
    const { data } = await get(link_finale);

    const { total_results, total_pages, results, page } = await data;

    const resultsData = results.map((item) => {
      return {
        original_title: item.title,
        idTmDB: item.id,
        poster_path_original: item.poster_path,
        vote_average: item.vote_average,
      };
    });

    const resultMovies = await dataMoviesList(
      resultsData,
      link_finale,
      language
    );

    const Result = {
      total_results,
      total_pages,
      page,
      results: resultMovies,
    };

    res.send(Result);
    //  logger.info(`POST /recommendationsMovies - ${page}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(
      `POST /recommendationsMovies - ${JSON.stringify(error.message)}`
    );
    return;
  }
}
// Pesquisa por filme ou Ator
async function searchMovies(req, res) {
  const param = req.params.page;
  const language = req.params.language;
  const option = req.body.option;
  const search = req.query.s;

  try {
    const page_ = typeof param === "undefined" ? `1` : param.trim();

    const link_finale = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${language}&query=${escape(
      removerAcentos(search)
    )}&page=${page_}&region=${language}`;

    switch (option) {
      case "title":
        const movies = await get(link_finale);

        const result_movies = await movies.data.results;
        const total_results = await movies.data.total_results;
        const total_pages = await movies.data.total_pages;
        const page = await movies.data.page;

        const resultsData = result_movies.map((item) => {
          return {
            original_title: item.title,
            idTmDB: item.id,
            poster_path_original: item.poster_path,
            vote_average: item.vote_average,
          };
        });

        const resultMovies = await dataMoviesList(
          resultsData,
          link_finale,
          language
        );
        const Result = {
          total_results,
          total_pages,
          page,
          results: resultMovies.sort((a, b) => {
            return b.vote_average - a.vote_average;
          }),
        };

        res.send(Result);
        /* logger.info(
          `POST /searchMovies/${page} - "${search}" - type=${option}`
        ); */
        break;
      case "actors":
        const peoples = await get(`
        https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${escape(
          search
        )}`);

        let results_people_movie = [];

        const IDpeople = await peoples.data.results.map((item) => {
          return item.id;
        });

        for (const key in IDpeople) {
          if (IDpeople.hasOwnProperty(key)) {
            const element = IDpeople[key];
            const json = await get(
              `https://api.themoviedb.org/3/person/${element}/movie_credits?api_key=${API_KEY}&language=en-US`
            );
            const value = json.data.cast;

            results_people_movie.push(...value);
          }
        }
        let tam = results_people_movie.length;
        let _page = parseInt(page_);
        let f = 0;
        let i = 0;

        let prev = Math.ceil(tam - 20);

        let contador = prev > 0 ? 1 : 0;

        do {
          contador++;
          prev = prev - 20;
        } while (prev > 0);

        let pagination = [];

        if (_page === 1 && _page < contador) {
          pagination = results_people_movie.slice(0, 20);
        } else if (_page > 1 && _page < contador) {
          f = _page * 20;
          i = f - 20;
          pagination = results_people_movie.slice(i, f);
        } else if (_page === contador) {
          f = _page * 20 - 20;
          i = tam;
          pagination = results_people_movie.slice(f, i);
        }

        if (pagination.length === 0) {
          res.send({
            message: `Pagina selecionada Inválida, para pesquisa "${search}" existe apenas "${contador}" paginas. `,
          });
          logger.info(
            `POST /searchMovies/${page} - "${search}" - type=${option} - Page Not Found`
          );
        }
        const odd = pagination.map((item) => {
          return {
            original_title: item.title,
            idTmDB: item.id,
            poster_path_original: item.poster_path,
            vote_average: item.vote_average,
          };
        });

        const resultMoviesPeople = await dataActoresMoviesList(
          odd,
          search,
          language
        );

        // filtragem para não repetir filmes do mesmo ator
        var semRepetidos = resultMoviesPeople.filter(function (a) {
          return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null));

        const ResultPeople = {
          total_results: tam,
          total_pages: contador,
          page: _page,
          results: semRepetidos.sort((a, b) => {
            return b.vote_average - a.vote_average;
          }),
        };

        res.send(ResultPeople);
        /*   logger.info(
          `POST /searchMovies/${page} - "${search}" - type=${option}`
        ); */
        break;

      default:
        res.send({ message: "Opção de pesquisa invalida!!!" });
        logger.info(
          `POST /searchMovies/${page} - "${search}" - type=${option} - Option Invalid`
        );
        break;
    }
    return res.end();
  } catch (error) {
    if (error.response) {
      const { status, statusText } = error.response;
      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(
      `POST /searchMovies/${page} - "${search}" - type=${option} - ${JSON.stringify(
        error.message
      )}`
    );
    return res.end();
  }
}
// page do filme escolhido
async function moviesDetails(req, res) {
  const movie_id = req.params.id;
  const language = req.params.language;

  try {
    const { data } = await get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );

    const result = await data;

    const resultsData = [
      {
        original_title: result.title,
        idTmDB: result.id,
        poster_path_original: `https://image.tmdb.org/t/p/original${result.poster_path}`,
        vote_average: result.vote_average,
      },
    ];

    const dataRatingsOMDB = await OMDB(resultsData, true);

    const link_finale = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=${language}&append_to_response=videos,casts,release_dates`;

    const dataMovieDetails = await dataMoviesDetails(
      dataRatingsOMDB,
      link_finale
    );

    const Result = {
      results: dataMovieDetails,
    };

    res.send(Result);
    //logger.info(`GET /moviesDetails - ${movie_id}`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /moviesDetails - ${movie_id} - ${error}`);
    return;
  }
}
// generos do filme
async function genresMovies(req, res) {
  const language = req.params.language;
  try {
    const { data } = await get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`
    );

    const { genres } = await data;

    res.send(genres);
    //  logger.info(`GET /genresMovies`);
    return;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      //res.status(status).send(statusText);
      res.sendStatus(status);
    }
    res.end();
    logger.error(`GET /genresMovies - ${JSON.stringify(error.message)}`);
    return;
  }
}
// dados como ratings imdb do omdb
async function OMDB(results, details = false) {
  const Arr = [];
  try {
    for (const key in results) {
      if (results.hasOwnProperty(key)) {
        const element = results[key];
        const { original_title, idTmDB, poster_path_original } = element;

        const { data } = await get(
          `http://www.omdbapi.com/?t=${escape(
            original_title
          )}&apikey=${OMDB_API_KEY}`
        );

        const {
          imdbRating,
          imdbID,
          Metascore,
          Director,
          Writer,
          Actors,
          Production,
        } = await data;

        if (details) {
          Arr.push({
            original_title,
            idTmDB,
            imdbRating,
            imdbID,
            Metascore,
            poster_path_original,
            Director,
            Writer,
            Actors,
            Production,
          });
        } else {
          Arr.push({
            original_title,
            idTmDB,
            imdbRating,
            imdbID,
            Metascore,
            poster_path_original,
          });
        }
      }
    }
    // logger.info(`FUNCTION /OMDB`);
  } catch (error) {
    logger.error(`FUNCTION /OMDB - ${JSON.stringify(error.message)}`);
  }
  return Arr;
}
// dados de retorno
async function dataMoviesList(resultsData, link, language) {
  let dataMovies = [];

  try {
    const { data } = await get(link);

    const { results } = await data;
    for (const key in resultsData) {
      if (resultsData.hasOwnProperty(key)) {
        const element = resultsData[key];
        results.map((value) => {
          if (value.id === element.idTmDB) {
            const original_title =
              language === "pt-BR" ? value.title : element.original_title;
            //prettier-ignore
            const poster_path =language === "pt-BR"? `https://image.tmdb.org/t/p/original${value.poster_path}`: `https://image.tmdb.org/t/p/original${element.poster_path_original}`;

            dataMovies.push({
              original_title,
              idTmDB: element.idTmDB,
              //prettier-ignore
              imdbRating:(element.imdbRating === undefined ? "N/A" : element.imdbRating),
              imdbID: element.imdbID === undefined ? "N/A" : element.imdbID,
              //prettier-ignore
              Metascore:element.Metascore === undefined ? "N/A" : element.Metascore,
              //prettier-ignore
              poster_path,
              vote_average:
                element.vote_average === 0
                  ? "N/A"
                  : element.vote_average === undefined
                  ? " N/A"
                  : Number(element.vote_average).toFixed(1),
            });
          }
        });
      }
    }
    //logger.info(`FUNCTION /dataMoviesList`);
  } catch (error) {
    logger.error(
      `FUNCTION /dataMoviesList -  ${JSON.stringify(error.message)}`
    );
  }

  //prettier-ignore
  return dataMovies;
}
//dados de retorno
async function dataMoviesDetails(resultsData, link) {
  let dataMovies = [...resultsData];

  try {
    //prettier-ignore
    const { data } = await get(link);

    const result = await data;

    // videos
    const videos = result.videos.results.map((item) => {
      return {
        src:
          item.key !== undefined || item.key !== null
            ? `https://www.youtube.com/embed/${item.key}?https://www.example.com"`
            : null,
        key: item.key,
        name: item.name,
      };
    });

    // cast
    const cast = result.casts.cast.map((item) => {
      return {
        character: item.character,
        id: item.id,
        name: item.name,
        profile_path:
          item.profile_path === null
            ? null
            : `https://image.tmdb.org/t/p/original${item.profile_path}`,
      };
    });

    const crewFilter = result.casts.crew.filter((item) => {
      return item.job === "Director";
    });

    const crew = crewFilter.map((item) => {
      return {
        departament: item.departament,
        id: item.id,
        job: item.job,
        name: item.name,
        profile_path:
          item.profile_path === null
            ? null
            : `https://image.tmdb.org/t/p/original${item.profile_path}`,
      };
    });

    const casts = [...cast];
    const crews = [...crew];

    const countryAge = result.release_dates.results.filter((item) => {
      if (item.iso_3166_1 === "BR" || item.iso_3166_1 === "US") {
        return {
          release_dates: item.release_dates[0].certification,
        };
      }
    });

    const countryAgeCertification = countryAge.map((itemAge) => {
      return {
        state: itemAge.iso_3166_1,
        certification:
          itemAge.release_dates[itemAge.release_dates.length - 1].certification,
      };
    });

    const {
      id,
      overview,
      genres,
      backdrop_path,
      release_date,
      runtime,
      poster_path,
      title,
      vote_average,
    } = result;

    return {
      title: title.toUpperCase(),
      idTmDB: id,
      overview,
      genres,
      backdrop_path:
        backdrop_path === null
          ? null
          : `https://image.tmdb.org/t/p/original${backdrop_path}`,
      release_date,
      year: release_date.slice(0, 4),
      runtime,
      poster_path:
        poster_path === null
          ? null
          : `https://image.tmdb.org/t/p/original${poster_path}`,
      videos: videos.length === 0 ? null : videos[0],
      casts,
      crews,
      certification: countryAgeCertification,
      ...dataMovies[0],
      vote_average,
    };
  } catch (error) {
    logger.info(
      `FUNCTION /dataMoviesDetails - ${JSON.stringify(error.message)}`
    );
  }
}
//dados de retorno
async function dataActoresMoviesList(resultsData, search, language) {
  let dataResults = [];
  try {
    //prettier-ignore
    const peoples = await get(`
  https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${escape(
    search
  )}`);

    let results_people_movie = [];

    const IDpeople = await peoples.data.results.map((item) => {
      return item.id;
    });

    for (const key in IDpeople) {
      if (IDpeople.hasOwnProperty(key)) {
        const element = IDpeople[key];
        const json = await get(
          `https://api.themoviedb.org/3/person/${element}/movie_credits?api_key=${API_KEY}&language=${language}`
        );
        const value = json.data.cast;

        results_people_movie.push(...value);
      }
    }
    for (const key in resultsData) {
      if (resultsData.hasOwnProperty(key)) {
        const element = resultsData[key];

        results_people_movie.map((value) => {
          if (value.id === element.idTmDB) {
            const original_title =
              language === "pt-BR" ? value.title : element.original_title;
            //prettier-ignore
            const poster_path =language === "pt-BR"? `https://image.tmdb.org/t/p/original${value.poster_path}`: `https://image.tmdb.org/t/p/original${element.poster_path_original}`;

            dataResults.push({
              original_title,
              idTmDB: element.idTmDB,
              imdbRating:
                element.imdbRating === undefined ? "N/A" : element.imdbRating,
              imdbID: element.imdbID === undefined ? "N/A" : element.imdbID,
              Metascore:
                element.Metascore === undefined ? "N/A" : element.Metascore,
              poster_path,
              vote_average:
                element.vote_average === 0
                  ? "N/A"
                  : element.vote_average === undefined
                  ? " N/A"
                  : Number(element.vote_average).toFixed(1),
            });
          }
        });
      }
    }
  } catch (error) {
    logger.info(
      `FUNCTION /dataActoresMoviesList - ${JSON.stringify(error.message)}`
    );
  }

  return dataResults;
}

module.exports = {
  randomMovies,
  popularMovies,
  topRatedMovies,
  upComingMovies,
  nowPlayingMovies,
  trendingMovies,
  searchMovies,
  moviesDetails,
  genresMovies,
  recommendationsMovies,
};

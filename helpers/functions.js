const dotenv = require("dotenv");
const { get } = require("axios");
dotenv.config();

const logger = require("../config/logger");

const { API_KEY } = process.env;

async function filterRandomMovies(genres, year, ratings) {
  let filters = [];
  let values = [];
  try {
    const { data } = await get(`
    https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&year=${year}&with_genres=${genres}`);

    const { total_pages, page } = await data;

    for (let i = page; i <= total_pages; i++) {
      const result = await get(`
      https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${i}&primary_release_year=${year}&year=${year}&with_genres=${genres}`);

      const { results } = await result.data;

      results.map((item) => {
        let value = {
          id: item.id,
          title: item.title,
          vote_average: item.vote_average,
        };

        values.push(value);
      });
    }
    filters = await ratingsRandomMovies(values, ratings);
  } catch (error) {
    logger.error(
      `Function Helper /filterRandomMovies - ${JSON.stringify(error.message)}`
    );
  }
  return filters;
}

async function ratingsRandomMovies(values, ratings) {
  let results = [];
  try {
    for (const key in values) {
      const element = values[key];

      const { title, id, vote_average } = element;
      if (vote_average >= ratings) {
        let value = {
          title,
          id,
          vote_average,
        };
        results.push(value);
      }
    }
  } catch (error) {
    logger.error(
      `Function Helper /ratingsRandomMovies - ${JSON.stringify(error.message)}`
    );
  }

  return results;
}

function removerAcentos(newStringComAcento) {
  var string = newStringComAcento;
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g,
    $1: /#(\S)/g,
  };

  for (var letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }

  return string;
}

module.exports = { removerAcentos, filterRandomMovies };

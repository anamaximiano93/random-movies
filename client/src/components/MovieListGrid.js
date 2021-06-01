import React from "react";
import PosterDefault from "../assets/images/poster_path_default.svg";
//import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";

export default function MovieListGrid({ movieList }) {
  //const languagePage = useSelector((state) => state);
  //const classes = useStyles()

  return movieList.map((item, index) => {
    let values = {
      imgSrc:
        item?.poster_path.slice(35, item.poster_path.length) === "null"
          ? PosterDefault
          : item.poster_path,
      imgAlt: item.original_title,
      imgTitle: item.original_title,
      title: item.original_title,
    };
    return <MovieItem values={values} movieItem={item} key={index} />;
  });
  /* const br =
    movieItem.poster_path === null ? PosterDefault : movieItem.poster_path;
  const us =
    movieItem.poster_path_original === null
      ? PosterDefault
      : movieItem.poster_path_original;
  if (languagePage === "pt-BR") {
    values = {
      imgSrc: br,
      imgAlt: movieItem.title,
      imgTitle: movieItem.title,
      title: movieItem.title,
    };
  } else {
    values = {
      imgSrc: us,
      imgAlt: movieItem.original_title,
      imgTitle: movieItem.original_title,
      title: movieItem.original_title,
    };
  } */
}

import { createStore } from "redux";

/* buscar no localstorage */

function languageStorage() {
  let INITIAL_STATE = "";
  const dados = localStorage.getItem("languageSelect");

  if (dados === null) {
    INITIAL_STATE = "pt-BR";
  } else {
    INITIAL_STATE = dados;
  }

  return INITIAL_STATE;
}

function reducer(state = languageStorage(), action) {
  if (action.type === "LANGUAGE_MODE") {
    const { language } = action;
    localStorage.setItem("languageSelect", language);
    return language;
  }

  return state;
}

const store = createStore(reducer);

export default store;

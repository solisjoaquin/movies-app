import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";

loadHeaderFooter();
const genre = getParam("genre");
const genreTitle = getParam("genre-title");
const dataSource = new ExternalServices();
const element = document.querySelector(".movies-list");
const moviesList = new MovieList(genre, genreTitle, dataSource, element);

moviesList.init();

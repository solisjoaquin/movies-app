import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import GenreList from "./GenreList.mjs";

loadHeaderFooter();
const dataSource = new ExternalServices();
const genreID = document.querySelector(".genre-list");
const genres = new GenreList(dataSource, genreID);

genres.init();

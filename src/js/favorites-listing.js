import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import FavoritesList from "./Favorites.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const element = document.querySelector(".favorites-list");
const moviesList = new FavoritesList(dataSource, element);

moviesList.init();
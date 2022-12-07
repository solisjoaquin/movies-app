import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieDetails from "./MovieDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParam("movie");

const product = new MovieDetails(productId, dataSource);
product.init();

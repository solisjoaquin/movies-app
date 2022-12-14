import { renderListWithTemplate } from "./utils.mjs";

function movieCardTemplate(movie) {
  return `<li class="product-card">
      <a href="/movie-page/index.html?movie=${movie.id}">
      <img
      src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
      alt="Image of ${movie.title}"
    />
      <h1 class="card__brand">${movie.title}</h1></a>
    </li>`;
}

export default class FavoritesList {
  constructor(dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.favIds = [];
    this.favMovies = [];
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    this.getFavIds();
    for (let i = 0; i < this.favIds.length; i++) {
      const movie = await this.dataSource.getMovieById(this.favIds[i]);
      this.favMovies.push(movie);
    }
    this.renderList(this.favMovies);
  }
  renderList(list) {
    renderListWithTemplate(movieCardTemplate, this.listElement, list);
  }
  getFavIds() {
    this.favIds = localStorage.getItem("fav-movies").split(",");
  }
}

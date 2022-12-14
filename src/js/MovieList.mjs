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

export default class MovieList {
  constructor(genre, genreTitle, dataSource, listElement) {
    this.genre = genre;
    this.genreTitle = genreTitle;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getMoviesByGenderId(this.genre);
    this.renderList(list.results);
    document.querySelector(".title").innerHTML = this.genreTitle;
  }
  renderList(list) {
    renderListWithTemplate(movieCardTemplate, this.listElement, list);
  }
}

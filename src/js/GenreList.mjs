import { renderListWithTemplate } from "./utils.mjs";

function genreListTemplate(genre) {
  return `<li class="product-card">
  <a href="/movies-listing/index.html?genre=${genre.id}&genre-title=${genre.name}">
  <h1 class="card__brand">${genre.name}</h1>
</li>`;
}

export default class GenreList {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const genres = await this.dataSource.getGenres();
    this.renderList(genres.genres);
  }

  renderList(genres) {
    renderListWithTemplate(genreListTemplate, this.listElement, genres);
  }
}

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
      this.favMovies = {};
      // this.idTitle = idTitle;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
      this.getFavIds();
      console.log(this.favIds);
      for (let id in this.favIds) {
        const movie = await this.dataSource.getMovieById(id);
        this.favMovies.push(movie);
        console.log(movie.results);
      }
      // our dataSource will return a Promise...so we can use await to resolve it.
      // const list = await this.dataSource.getMovieById(this.favMovies);
      // console.log(list.results);
      // // render the list
      // this.renderList(list.results);
      this.renderList(this.favMovies.results);
    }
    // render after doing the first stretch
    renderList(list) {
      renderListWithTemplate(movieCardTemplate, this.listElement, list);
    }
    getFavIds() {
      this.favIds = localStorage.getItem("fav-movies").split(",");
    }
  }
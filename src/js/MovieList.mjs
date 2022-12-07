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

/* function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/movie_page/index.html?movie=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}
 */
export default class ProductList {
  constructor(genre, genreTitle, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.genre = genre;
    this.genreTitle = genreTitle;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getMoviesByGenderId(this.genre);
    console.log(list.results);
    // render the list
    this.renderList(list.results);
    //set the title to the current genre
    document.querySelector(".title").innerHTML = this.genreTitle;
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(movieCardTemplate, this.listElement, list);
  }

  // render before doing the stretch
  // renderList(list) {
  //   const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  // }
}

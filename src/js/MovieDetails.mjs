import { setLocalStorage, getLocalStorage, alertMessage, getParam } from "./utils.mjs";

function productDetailsTemplate(movie) {
  return `<section class="product-detail"><h3>${movie.title}</h3>
  <button id="fav">
    <img class="star" src="../public/images/unmarked-fav.png">
    <img class="star" src="../public/images/marked-fav.png">
  <span>Favorite</span>
  </button>
  <img
      class="divider"
      src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
      alt="Image of ${movie.title}"
    />
    <p class="product-card__price">Popularity: ${movie.popularity}</p>
    <p class="product__color">Release date: ${movie.release_date}</p>
    <p class="product__description">
    ${movie.overview}
    </p>
    </section>`;
}

export default class MovieDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.favButton = "";
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.getMovieById(this.productId);

    // once we have the product details we can render out the HTML
    this.renderMovieDetails("main");

    if (localStorage.getItem("fav-movies")){
      let vals = localStorage.getItem("fav-movies").split(",");
      if(vals.includes(this.productId)) {
        document.querySelector("#fav").classList = "checked";
      }
    }
    // once the HTML is rendered we can add a listener to Add to Cart button
    this.favButton = document.querySelector("#fav");
    this.favButton.onclick = this.markFavorite;
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
  }

  renderMovieDetails(product) {
    const element = document.querySelector(product);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }

  markFavorite() {
    const movieId = getParam("movie");
    console.log(movieId);

    if (localStorage.getItem("fav-movies")){
      let vals = localStorage.getItem("fav-movies").split(",");
  
      if(! vals.includes(movieId)) {
        document.querySelector("#fav").classList = "checked";

        vals.push(movieId);
      }else{
        document.querySelector("#fav").classList ="";

        for (var i=0; i<vals.length; i++){
          if (vals[i] === movieId){
            vals.splice(i, 1);
          }
        }
      }
      localStorage.setItem("fav-movies", vals.join(","));
    }else{
      localStorage.setItem("fav-movies",movieId);
    }
  }
}

import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.title}</h3>
    <p class="product-card__price">Popularity: ${product.popularity}</p>
    <p class="product__color">Release date: ${product.release_date}</p>
    <p class="product__description">
    ${product.overview}
    </p>
    </section>`;
}

export default class MovieDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.getMovieById(this.productId);

    // once we have the product details we can render out the HTML
    this.renderMovieDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
  }

  renderMovieDetails(product) {
    const element = document.querySelector(product);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
const moviesURL = "https://api.themoviedb.org/3/";
const apiKey = "0a057e5cef47255a8b3f29588d59ef49";

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async getGenres() {
    const response = await fetch(
      `${moviesURL}genre/movie/list?api_key=0a057e5cef47255a8b3f29588d59ef49`
    );
    const data = await convertToJson(response);
    return data;
  }

  async getMoviesByGenderId(genderId) {
    const response = await fetch(
      `${moviesURL}discover/movie?api_key=0a057e5cef47255a8b3f29588d59ef49&language=en-US&sort_by=popularity.desc&with_genres=${genderId}`
    );
    const data = await convertToJson(response);
    return data;
  }

  async getMovieById(movieId) {
    const response = await fetch(
      `${moviesURL}movie/${movieId}?api_key=0a057e5cef47255a8b3f29588d59ef49`
    );
    const data = await convertToJson(response);
    console.log(data);
    return data;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
  async loginRequest(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(baseURL + "login", options).then(
      convertToJson
    );
    return response.accessToken;
  }
  // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
  async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }
}

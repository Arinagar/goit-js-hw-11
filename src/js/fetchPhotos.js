const axios = require('axios').default;

export class GetPhotos {
  #MAIN_URL = 'https://pixabay.com/api/';
  #key = '31519936-a40efe08f879d78a0873eff0f';
  #page = 1;
  #per_page = 40;
  #query = '';

  async getPhotos() {
    const response = await axios.get(
      `${this.#MAIN_URL}?key=${this.#key}&q=${
        this.#query
      }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
        this.#per_page
      }&page=${this.#page}`
    );
    return response;
  }
  get query() {
    return this.#query;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }
  incrementPage() {
    this.#page += 1;
  }
  resetPage() {
    this.#page = 1;
  }
}

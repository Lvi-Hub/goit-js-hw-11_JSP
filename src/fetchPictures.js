import axios from 'axios';

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
export class jsonPlaceholderAPI {
  #BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  #API_KEY = '481cbb6dba5121edc01136f73aa6b3c6';

  language = null;
  query = 'Крід';
  page = 1;
  include_adult = false;
  region = null;
  year = null;
  primary_release_year = null;

  language = null;
  searchName = null;
  query = null;
  page = 1;
  per_page = 40;
  //isLastPage = false;
  constructor(isLastPage) {
    this.isLastPage = isLastPage;
  }
  async fetchPictures() {
    try {
      // return await axios.get(`${this.#BASE_URL}?api_key=${this.#API_KEY}`, {
      return await axios.get(`${this.#BASE_URL}?api_key=${this.#API_KEY}`, {
        params: {
          language: this.language,
          query: this.query,
          page: this.page,
          include_adult: this.inlude_adult,
          region: this.region,
          year: this.year,
          primary_release_year: this.primary_release_year,
        },
      });
    } catch (err) {
      throw new Error(err.massage);
    }
  }
}

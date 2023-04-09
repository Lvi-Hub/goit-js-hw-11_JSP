import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//--
import './css/styles.css';
import Notiflix from 'notiflix';
import { jsonPlaceholderAPI } from './fetchPictures.js';
//
import markupSearchPictures from './templates/pictures-list.hbs';
const ref = {
  submitEl: document.querySelector('#search-form'),
  picturesGallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

ref.submitEl = addEventListener('submit', inputSearch);
ref.btnLoadMore = addEventListener('click', loadMore);
//--
const jsonPlaceholderApi = new jsonPlaceholderAPI();
//--
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
//--

function inputSearch(e) {
  e.preventDefault();
  let searchName = e.target.elements.searchQuery.value.trim();
  jsonPlaceholderApi.searchName = searchName;
  console.log(searchName);
  //--
  jsonPlaceholderApi.page = 1;
  jsonPlaceholderApi
    .fetchPictures()
    .then(({ data }) => {
      if (searchName === '') {
        Notiflix.Notify.failure('Please full fill form and try again.');
        return;
      }

      if (data.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      ref.picturesGallery.innerHTML = '';
      ref.picturesGallery.insertAdjacentHTML(
        'beforeend',
        markupSearchPictures(data.hits)
      );
      console.log(data);
      console.log();
      lightbox.refresh();

      console.log(jsonPlaceholderApi.page);
    })
    .catch(err => {
      console.log(err);
    });
}

function loadMore() {
  jsonPlaceholderApi.page += 1;
  jsonPlaceholderApi
    .fetchPictures()
    .then(({ data }) => {
      ref.picturesGallery.insertAdjacentHTML(
        'beforeend',
        markupSearchPictures(data.hits)
      );
      console.log(data);
      console.log();
      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    });
}

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
};

ref.submitEl = addEventListener('submit', inputSearch);
//--
const jsonPlaceholderApi = new jsonPlaceholderAPI();
//--

function inputSearch(e) {
  e.preventDefault();
  let searchName = e.target.elements.searchQuery.value.trim();
  jsonPlaceholderApi.searchName = searchName;
  console.log(searchName);
  //--
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

      ref.picturesGallery.innerHTML = markupSearchPictures(data.hits);
      console.log(data);
      console.log();
    })
    .catch(err => {});
}
var lightbox = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt',
  captionDelay: 250,
});

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import Notiflix from 'notiflix';
import { jsonPlaceholderAPI } from './fetchPictures.js';
import markupSearchPictures from './templates/pictures-list.hbs';

const refs = {
  submitEl: document.querySelector('#search-form'),
  picturesGallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
refs.btnLoadMore.addEventListener('click', onLoadBtn);
refs.submitEl.addEventListener('submit', inputSearch);

//--
const jsonPlaceholderApi = new jsonPlaceholderAPI();
//--
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
//--

async function inputSearch(e) {
  e.preventDefault();
  let searchName = e.target.elements.searchQuery.value.trim();
  jsonPlaceholderApi.searchName = searchName;
  console.log(searchName);
  //--
  jsonPlaceholderApi.page = 1;
  try {
    const { data } = await jsonPlaceholderApi.fetchPictures();

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
    refs.picturesGallery.innerHTML = '';
    refs.picturesGallery.insertAdjacentHTML(
      'beforeend',
      markupSearchPictures(data.hits)
    );
    lightbox.refresh();
    refs.btnLoadMore.classList.remove('is-hidden');
    console.log(data);
    console.log(jsonPlaceholderApi.page);
  } catch (err) {
    console.log(err);
  }
}

async function onLoadBtn() {
  jsonPlaceholderApi.page += 1;
  try {
    const { data } = await jsonPlaceholderApi.fetchPictures();
    refs.picturesGallery.insertAdjacentHTML(
      'beforeend',
      markupSearchPictures(data.hits)
    );
    console.log(data);
    console.log();
    lightbox.refresh();
    if (
      jsonPlaceholderApi.per_page * jsonPlaceholderApi.page >=
      data.totalHits
    ) {
      refs.btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.info(
        'Sorry, this was the last picture form this collection.'
      );
    }
  } catch (err) {
    console.log(err);
  }
}

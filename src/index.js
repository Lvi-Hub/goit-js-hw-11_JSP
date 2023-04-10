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

  //--
  jsonPlaceholderApi.page = 1;
  if (searchName === '') {
    Notiflix.Notify.failure('Please full fill form and try again.');
    return;
  }

  try {
    const { data } = await jsonPlaceholderApi.fetchPictures();

    if (data.total === 0) {
      refs.btnLoadMore.classList.add('is-hidden');
      refs.picturesGallery.innerHTML = '';
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
    autoScroll(1);
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    lightbox.refresh();
    if (data.total > jsonPlaceholderApi.per_page)
      refs.btnLoadMore.classList.remove('is-hidden');
    else {
      refs.btnLoadMore.classList.add('is-hidden');
    }
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
    //--При нажатті на кнопку автоматично підскролюється сторінка
    autoScroll();
    //--
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

//--При нажатті на кнопку автоматично підскролюється сторінка
function autoScroll(autoHigh) {
  if (autoHigh === 1) {
    window.scrollBy({
      top: 60,
      behavior: 'smooth',
    });
  } else {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

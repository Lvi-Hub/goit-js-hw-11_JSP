import './css/styles.css';
import Notiflix from 'notiflix';
import { JSONPlaceholderAPI } from './fetchPictures.js';
//
import markupSearchNameHBS from './templates/pictures-list.hbs';
const ref = {
  submitEl: document.querySelector('#search-form'),
  picturesGallery: document.querySelector('.gallery'),
};

ref.submitEl = addEventListener('submit', inputSearch);

function inputSearch(e) {}

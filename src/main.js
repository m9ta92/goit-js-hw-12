import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './js/pixabay-api.js';
import { createGalleryCardTemplate } from './js/render-function.js';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;
let searchedValue = '';

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    loader.classList.add('js-loader');

    searchedValue = searchFormEl.elements.user_query.value;

    currentPage = 1;

    const response = await fetchPhotos(searchedValue, currentPage);

    loader.classList.remove('js-loader');

    //
    if (response.data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching <br> your search query. Please try again!',
      });
      //
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      //
      return;
    }

    const productCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    const productsGalleryEl = document.querySelector('.gallery');

    productsGalleryEl.innerHTML = productCardsTemplate;

    loadMoreBtnEl.classList.add('load-more');

    lightbox.refresh();
    searchFormEl.reset();
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;

    const response = await fetchPhotos(searchedValue, currentPage);

    const productCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', productCardsTemplate);

    if (response.data.hits.length === 0) {
      loadMoreBtnEl.classList.remove('load-more');

      iziToast.info({
        position: 'topRight',
        message:
          'We are sorry, but you have reached the end of search results.',
      });
    }

    lightbox.refresh();
    searchFormEl.reset();
  } catch (err) {
    console.log(err);
  }
};
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

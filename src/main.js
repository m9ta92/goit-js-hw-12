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

function pageScrolling() {
  const galleryCard = document.querySelector('.gallery-item');
  const cardHeight = galleryCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    loader.classList.add('js-loader');
    searchedValue = searchFormEl.elements.user_query.value.trim();
    currentPage = 1;
    const response = await fetchPhotos(searchedValue, currentPage);
    loader.classList.remove('js-loader');
    if (searchedValue === '') {
      iziToast.info({
        position: 'topRight',
        message: 'Please enter a word to search for...!',
      });
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }
    if (response.data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching <br> your search query. Please try again!',
      });
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }
    const productCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    const productsGalleryEl = document.querySelector('.gallery');
    productsGalleryEl.innerHTML = productCardsTemplate;
    if (response.data.totalHits <= 15) {
      iziToast.info({
        position: 'topRight',
        message: 'These are all images for this request',
      });
      lightbox.refresh();
      searchFormEl.reset();
      return;
    }
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
    console.dir(response);

    const productCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', productCardsTemplate);

    if (response.data.hits.length < 15) {
      loadMoreBtnEl.classList.remove('load-more');
      iziToast.info({
        position: 'topRight',
        message:
          'We are sorry, but you have reached the end of search results.',
      });
    }
    lightbox.refresh();
    searchFormEl.reset();
    pageScrolling();
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

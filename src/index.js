import { GetPhotos } from './js/fetchPhotos';
import { createMarkup } from './js/markupCreate';
import Notiflix from 'notiflix';
const searchFormEl = document.querySelector('.search-form');
const galleryDivEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const pixabayApi = new GetPhotos();

async function onFormSubmitCreateMarkup(event) {
  const searchQuery = event.target.searchQuery.value.trim().toLowerCase();
  event.preventDefault();
  if (!searchQuery) {
    return;
  }
  try {
    galleryDivEl.innerHTML = '';
    pixabayApi.query = searchQuery;
    const { data } = await pixabayApi.getPhotos();
    console.log(data.hits);
    let markup = createMarkup(data.hits);
    galleryDivEl.insertAdjacentHTML('beforeend', markup.join(''));
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    searchFormEl.reset();
    if (data.totalHits > 40) {
      btnLoadMore.classList.remove('hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images mathing your search query. Please try again'
    );
  }
}

async function onBtnLoadMoreClick(event) {
  pixabayApi.incrementPage();
  const { data } = await pixabayApi.getPhotos();
  let markup = createMarkup(data.hits);
  galleryDivEl.insertAdjacentHTML('beforeend', markup.join(''));
}
searchFormEl.addEventListener('submit', onFormSubmitCreateMarkup);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

import markup from './js/markupCreate';
import { getPhotos } from './js/fetchPhotos';
import { createMarkup } from './js/markupCreate';
import Notiflix from 'notiflix';
const searchFormEl = document.querySelector('.search-form');
const galleryDivEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

async function onFormSubmitCreateMarkup(event) {
  const searchQuery = event.target.searchQuery.value.trim().toLowerCase();
  event.preventDefault();

  try {
    if (searchQuery) {
      galleryDivEl.innerHTML = '';
      const { data } = await getPhotos(searchQuery);
      let markup = createMarkup(data.hits);
      galleryDivEl.insertAdjacentHTML('beforeend', markup.join(''));
      searchFormEl.reset();
      btnLoadMore.classList.remove('hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure('error');
  }
}

async function onBtnLoadMoreClick(event) {
  getPhotos.page += 1;
  const { data } = await getPhotos();
  let markup = createMarkup(data.hits);
  galleryDivEl.insertAdjacentHTML('beforeend', markup.join(''));
}
searchFormEl.addEventListener('submit', onFormSubmitCreateMarkup);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

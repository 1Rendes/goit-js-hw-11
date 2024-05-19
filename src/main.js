import { renderImages } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
const formInput = document.querySelector('.search-image-form');
const imagesDiv = document.querySelector('.gallery');
const span = document.querySelector('.loader');
formInput.addEventListener('submit', event => {
  event.preventDefault();
  imagesDiv.innerHTML = '';
  const searchRequest = formInput.elements.input.value.trim();
  if (!searchRequest) {
    return iziToast.error({
      position: 'topRight',
      message: 'Search request must not be blank',
    });
  }
  span.classList.remove('visually-hidden');
  fetchImages(searchRequest)
    .then(imagesData => {
      if (!imagesData.total) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      return imagesData;
    })
    .then(imagesData => {
      imagesDiv.append(...renderImages(imagesData));
      gallery.refresh();
      span.classList.add('visually-hidden');
    })
    .catch(error => console.log(`Error: ${error}`));
});

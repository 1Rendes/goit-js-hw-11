import { renderImages } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
const formInput = document.querySelector('.search-image-form');
const imagesDiv = document.querySelector('.gallery');
formInput.addEventListener('submit', event => {
  event.preventDefault();
  imagesDiv.innerHTML = '';
  fetchImages(formInput.elements.input.value).then(imagesData => {
    imagesDiv.append(...renderImages(imagesData));
    simpleLightbox.refresh();
  });
});

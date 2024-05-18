import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
export function fetchImages(input) {
  if (!input) {
    return iziToast.error({
      position: 'topRight',
      message: 'Search request must not be blank',
    });
  }
  return fetch(
    `https://pixabay.com/api/?key=43920119-17be8655c7213217026175d69&q=${encodeURIComponent(
      input.trim()
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(responce => {
      if (!responce) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
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
    .catch(error => console.log(`Error: ${error}`));
}

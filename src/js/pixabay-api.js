export function fetchImages(input) {
  return fetch(
    `https://pixabay.com/api/?key=43920119-17be8655c7213217026175d69&q=${encodeURIComponent(
      input
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(responce => {
    if (!responce) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}

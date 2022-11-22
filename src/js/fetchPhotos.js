// import axios from 'axios';
const axios = require('axios').default;

async function getPhotos(query) {
  const MAIN_URL = 'https://pixabay.com/api/';
  const key = '31519936-a40efe08f879d78a0873eff0f';
  let page = 1;

  const response = await axios.get(
    `${MAIN_URL}?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return response;
}

export { getPhotos };

// import axios from 'axios';

// const key = '31519936-a40efe08f879d78a0873eff0f';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = key;

// export function getPhotos(submit) {
//   axios
//     .get(`?q=${submit}`, {
//       params: { image_type: photo, orientation: horizontal, safesearch: true },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// export async function getPhotos(input) {
// const { data } = await axios.get(`?q=${input}&image_type=photo`);
// }

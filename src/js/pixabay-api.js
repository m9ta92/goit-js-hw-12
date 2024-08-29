import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchedValue , pageNumber) => {
  const axiosOptions = {
    params: {
      key: '45487813-fe5f6ff630a438f35d0eece69',
      q: searchedValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: pageNumber,
      per_page: 15,
    },
  };

  return axios.get(``, axiosOptions);
};

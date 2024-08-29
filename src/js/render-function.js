export const createGalleryCardTemplate = image => {
  return ` 
<li class="gallery-item">
  <div>
    <a
      class="gallery-link"
      href="${image.largeImageURL}"
      onclick="return false"
    >
      <img
        class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
      />
    </a>
    <ul class="card">
      <li class="card-item">
        <h3 class="card-item-title">Likes</h3>
        <p class="card-item-inf">${image.likes}</p>
      </li>
      <li class="card-item">
        <h3 class="card-item-title">Views</h3>
        <p class="card-item-inf">${image.views}</p>
      </li>
      <li class="card-item">
        <h3 class="card-item-title">Comments</h3>
        <p class="card-item-inf">${image.comments}</p>
      </li>
      <li class="card-item">
        <h3 class="card-item-title">Downloads</h3>
        <p class="card-item-inf">${image.downloads}</p>
      </li>
    </ul>
  </div>
</li>
    `;
};

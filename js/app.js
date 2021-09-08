const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('img.lightbox__image'),
}

refs.gallery.insertAdjacentHTML('afterbegin', createGalleryItem(galleryItems))

refs.gallery.addEventListener('click', onClickGalleryitem)

refs.modal.addEventListener('click', e => {
  if (e.target.dataset.action === 'prev-image') onPrevImage();
  if (e.target.dataset.action === 'next-image') onNextImage();
  if (e.target.classList.contains('lightbox__overlay') ||
    e.target.dataset.action === 'close-lightbox')
    onCloseModal();
}
)

function createGalleryItem(items) {
  return items
    .map(({preview, original, description}) =>
  `<li class="gallery__item">
    <a class="gallery__link" href="${preview}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`)
    .join('')
}

function onClickGalleryitem(e) {
  if (!e.target.classList.contains('gallery__image')) return;
  e.preventDefault();
  refs.modal.classList.add('is-open');
  setModalImageSrcAndAlt(e.target.dataset.source, e.target.alt);
  window.addEventListener('keydown', onKeyDown);
}

function setModalImageSrcAndAlt(src, alt) {
  refs.modalImage.src = src;
  refs.modalImage.alt = alt;
}

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  setModalImageSrcAndAlt('','')
  window.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  if (!refs.modal.classList.contains('is-open')) return;
  switch (e.code) {
    case 'Escape':
      onCloseModal();
      break;
    case 'ArrowLeft':
      onPrevImage();
      break;
    case 'ArrowRight':
      onNextImage();
      break;
  }
}

function onNextImage() {
  let currentImageIndex = findImageIndex(refs.modalImage.getAttribute('src'))
  if (currentImageIndex === galleryItems.length - 1) currentImageIndex = -1;
  setModalImageSrcAndAlt(
    galleryItems[currentImageIndex + 1].original,
    galleryItems[currentImageIndex + 1].description,
  )
 }

function onPrevImage() {
  let currentImageIndex = findImageIndex(refs.modalImage.getAttribute('src'))
  if (currentImageIndex === 0) currentImageIndex = galleryItems.length
  setModalImageSrcAndAlt(
  galleryItems[currentImageIndex - 1].original,
  galleryItems[currentImageIndex - 1].description,
  )
}

function findImageIndex(src) {
 return galleryItems.indexOf(galleryItems.find(el => el.original === src))
}
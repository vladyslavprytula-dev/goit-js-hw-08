import { default as galleryItems } from "./gallery-items.js";
const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector("div.lightbox"),
  imgLightbox: document.querySelector("img.lightbox__image"),
  button: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxContent: document.querySelector("div.lightbox__content"),
};
console.log(refs.lightboxContent);
let i = 0;
const createGalleryItem = (galleryItem) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");
  li.insertAdjacentHTML(
    "afterbegin",
    ` <img class="gallery__image" src="${galleryItem.preview}" data-source="${
      galleryItem.original
    }" alt="${galleryItem.description}" id="${(i += 1)}"  />`
  );

  return li;
};
const addImgtoCard = (galleryItems) => {
  return galleryItems.map((galleryItem) => createGalleryItem(galleryItem));
};
const addGalleryItemtoDomRef = (domRef, img) => {
  domRef.append(...addImgtoCard(img));
};
addGalleryItemtoDomRef(refs.gallery, galleryItems);

refs.gallery.addEventListener("click", onImgsClick);
function onImgsClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.imgLightbox.setAttribute("src", `${event.target.dataset.source}`);
  let counterValue = event.target.id;
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37) {
      counterValue = Math.max(Number(counterValue) - 1, 1);
      let elem = document.getElementById(counterValue);
      refs.imgLightbox.setAttribute("src", `${elem.dataset.source}`);
    }
    if (e.keyCode === 39) {
      counterValue = Math.min(Number(counterValue) + 1, 9);
      let elem = document.getElementById(counterValue);
      refs.imgLightbox.setAttribute("src", `${elem.dataset.source}`);
    }
  });
}
refs.button.addEventListener("click", closeLightbox);
function closeLightbox() {
  refs.lightbox.classList.remove("is-open");
  refs.imgLightbox.removeAttribute("src");
}
refs.lightboxContent.addEventListener("click", closeLightbox);

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    refs.lightbox.classList.remove("is-open");
    refs.imgLightbox.removeAttribute("src");
  }
});

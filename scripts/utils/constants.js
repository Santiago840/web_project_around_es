export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

export const configForm = {
  inputClass: ".popup__input",
  btnSelector: ".popup__button",
  errorClass: "popup__input-error",
  errorClassActive: "popup__input-error_active",
};

export const formValids = [];
export const profileSection = document.querySelector(".profile");
export const profileEditBtn = profileSection.querySelector(".profile__edit-button");
export const profileAddBtn = profileSection.querySelector(".profile__add-button");
export const popupProfile = document.querySelector("#edit-popup");
export const popupNewCard = document.querySelector("#new-card-popup");
export const formEdit = popupProfile.querySelector("#edit-profile-form");
export const formAddCard = popupNewCard.querySelector("#new-card-form");
export let popupInputName = formEdit.querySelector(".popup__input_type_name");
export let popupInputDescription = formEdit.querySelector(
  ".popup__input_type_description",
);


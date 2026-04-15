import Api from "../components/Api.js";

export const configForm = {
  inputClass: ".popup__input",
  btnSelector: ".popup__button",
  errorClass: "popup__input-error",
  errorClassActive: "popup__input-error_active",
};
export const formValids = [];
export const profileSection = document.querySelector(".profile");
export const profileEditBtn = profileSection.querySelector(
  ".profile__edit-button",
);
export const profileAddBtn = profileSection.querySelector(
  ".profile__add-button",
);
export const popupProfile = document.querySelector("#edit-popup");
export const popupNewCard = document.querySelector("#new-card-popup");
export const formEdit = popupProfile.querySelector("#edit-profile-form");
export const formAddCard = popupNewCard.querySelector("#new-card-form");
export let popupInputName = formEdit.querySelector(".popup__input_type_name");
export let popupInputDescription = formEdit.querySelector(
  ".popup__input_type_description",
);
export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "a3301193-c1de-42e7-89f6-308a6476ad81",
    "Content-Type": "application/json",
  },
});
export const profileEditImageBtn = document.querySelector(".profile__edit-icon");
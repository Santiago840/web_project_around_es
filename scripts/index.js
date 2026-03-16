import {
  openModal,
  closeModal,
  closeModalEscKey,
  closeModalOverlay,
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from "./utils.js";
import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

let initialCards = [
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

const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description",
);
const profileEditBtn = profileSection.querySelector(".profile__edit-button");
const profileAddBtn = profileSection.querySelector(".profile__add-button");
const popupProfile = document.querySelector("#edit-popup");
const popupNewCard = document.querySelector("#new-card-popup");
const popupCloseBtn = document.querySelectorAll(".popup__close");
const formEdit = popupProfile.querySelector("#edit-profile-form");
const formAddCard = popupNewCard.querySelector("#new-card-form");
let popupInputName = formEdit.querySelector(".popup__input_type_name");
let popupInputDescription = formEdit.querySelector(
  ".popup__input_type_description",
);
const cardsList = document.querySelector(".cards__list");
const configForm = {
  inputClass: ".popup__input",
  btnSelector: ".popup__button",
  errorClass: "popup__input-error",
  errorClassActive: "popup__input-error_active",
};
const formValids = [];
const elementsProfile = {
  title: profileTitle,
  description: profileDescription,
  inputName: popupInputName,
  inputDescription: popupInputDescription,
};

(function initialize() {
  initializeCards();
  setEventListeners();
  validateForms();
  closeModalOverlay();
  closeModalEscKey();
})();

function initializeCards() {
  initialCards.forEach((element) => {
    const card = new Card(element, "#template-card");
    addCard(card);
  });
}

function validateForms() {
  const forms = document.querySelectorAll(".popup__form");

  forms.forEach((form) => {
    const formValidated = new FormValidator(configForm, form);
    formValidated.setEventListeners();
    formValids[form.id] = formValidated;
  });
}

function addCard(card) {
  cardsList.prepend(card.generateCard());
}

function fillProfileForm(name, description) {
  popupInputName.value = name;
  popupInputDescription.value = description;
}

function handleOpenedEditModal() {
  fillProfileForm(profileTitle.textContent, profileDescription.textContent);
  formValids[formEdit.id].resetValidation();
  openModal(popupProfile);
}

function handleOpenedAddCardModal() {
  formAddCard.reset();
  formValids[formAddCard.id].resetValidation();
  openModal(popupNewCard);
}

function setEventListeners() {
  formEdit.addEventListener("submit", (evt) => {
    handleProfileFormSubmit(evt, elementsProfile, popupProfile);
  });

  formAddCard.addEventListener("submit", (evt) => {
    handleCardFormSubmit(evt, { Card, addCard }, popupNewCard);
  });

  profileAddBtn.addEventListener("click", handleOpenedAddCardModal);

  profileEditBtn.addEventListener("click", handleOpenedEditModal);
  
  popupCloseBtn.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".popup"));
    });
  });
}

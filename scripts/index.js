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
let profileTitle = profileSection.querySelector(".profile__title");
let profileDescription = profileSection.querySelector(".profile__description");
const profileEditBtn = profileSection.querySelector(".profile__edit-button");
const profileAddBtn = profileSection.querySelector(".profile__add-button");
const popupProfile = document.querySelector("#edit-popup");
const popupNewCard = document.querySelector("#new-card-popup");
const popupCloseBtn = document.querySelectorAll(".popup__close");
const formEdit = popupProfile.querySelector("#edit-profile-form");
const formAddCard = popupNewCard.querySelector("#new-card-form");
const popupImage = document.querySelector("#image-popup");
let popupInputName = formEdit.querySelector(".popup__input_type_name");
let popupInputDescription = formEdit.querySelector(
  ".popup__input_type_description",
);
const cardsList = document.querySelector(".cards__list");
const templateCard = cardsList
  .querySelector("#template-card")
  .content.querySelector(".card");

initialCards.forEach((element) => {
  renderCard(element["name"], element["link"], cardsList);
});

function getCardElement(name, link) {
  const cardElement = templateCard.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  let cardLikeBtn = cardElement.querySelector(".card__like-button");
  let cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;

  cardTitle.textContent = name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    handleOpenedImageModal(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  let card = getCardElement(name, link);
  container.prepend(card);
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm(name, description) {
  popupInputName.value = name;
  popupInputDescription.value = description;
}

function showInputError(input, errorElement) {
  input.classList.add("popup__input-error");
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(input, errorElement) {
  input.classList.remove("popup__input-error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function validateForms() {
  const forms = document.querySelectorAll(".popup__form");
  forms.forEach((form) => {
    const formInputs = form.querySelectorAll(".popup__input");

    const formBtn = form.querySelector(".popup__button");

    formInputs.forEach((input) => {
      const errorElement = form.querySelector(`.${input.id}-input-error`);
      input.addEventListener("input", () => {
        if (!input.checkValidity()) {
          showInputError(input, errorElement);
        } else {
          hideInputError(input, errorElement);
        }

        toggleButtonState(formInputs, formBtn);
      });
    });
  });
}

function handleOpenedEditModal() {
  openModal(popupProfile);
  fillProfileForm(profileTitle.textContent, profileDescription.textContent);
}

function handleOpenedImageModal(name, link) {
  openModal(popupImage);
  fillImageInfo(name, link);
}

function fillImageInfo(name, link) {
  let imageElement = popupImage.querySelector(".popup__image");
  let captionElement = popupImage.querySelector(".popup__caption");
  imageElement.alt = name;
  captionElement.textContent = name;
  imageElement.src = link;
}

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let name = evt.target.querySelector(".popup__input_type_card-name").value;
  let link = evt.target.querySelector(".popup__input_type_url").value;
  renderCard(name, link, cardsList);
  evt.target.reset();
  closeModal(popupNewCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closeModal(popupProfile);
}

profileAddBtn.addEventListener("click", () => {
  openModal(popupNewCard);
});

profileEditBtn.addEventListener("click", handleOpenedEditModal);

popupCloseBtn.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

function closeModalEscKey() {
  document.addEventListener("keydown", (evt) => {
    const popup = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape" && popup) {
      closeModal(popup);
    }
  });
}

function closeModalOverlay() {
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(evt.target);
    }
  });
}

function handleCloseModalOverlay() {
  closeModalOverlay();
  closeModalEscKey();
}

handleCloseModalOverlay();
validateForms();

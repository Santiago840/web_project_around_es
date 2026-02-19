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

initialCards.forEach((element) => {
  console.log(element["name"]);
});

const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description",
);
const profileEditBtn = profileSection.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#edit-popup");
const popupCloseBtn = popupProfile.querySelector(".popup__close");
const popupForm = popupProfile.querySelector(".popup__form");
const popupInputName = popupForm.querySelector(".popup__input_type_name");
const popupInputDescription = popupForm.querySelector(
  ".popup__input_type_description",
);

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

function handleOpenedEditModal() {
  openModal(popupProfile);
  fillProfileForm(profileTitle.textContent, profileDescription.textContent);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closeModal(popupProfile);
}

profileEditBtn.addEventListener("click", handleOpenedEditModal);

popupCloseBtn.addEventListener("click", () => {
  closeModal(popupProfile);
});

popupForm.addEventListener("submit", handleProfileFormSubmit);
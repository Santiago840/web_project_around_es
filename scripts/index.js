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
const popupForm = popupProfile.querySelector("#edit-profile-form");
const popupAddForm = document.querySelector("#new-card-form");
const popupImage = document.querySelector("#image-popup");
let popupInputName = popupForm.querySelector(".popup__input_type_name");
let popupInputDescription = popupForm.querySelector(
  ".popup__input_type_description",
);
const cardsList = document.querySelector(".cards__list");
const templateCard = cardsList
  .querySelector("#template-card")
  .content.querySelector(".card");

initialCards.forEach((element) => {
  renderCard(element["name"], element["link"], cardsList);
});

function getCardElement(
  name = "Sin título",
  link = "../images/placeholder.jpg"
) {
  const cardElement = templateCard.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");
  let cardLikeBtn = cardElement.querySelector(".card__like-button");
  let cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;

  cardTitle.textContent = name;

  cardLikeBtn.addEventListener('click', ()=>{
    cardLikeBtn.classList.toggle('card__like-button_is-active');
  });

  cardDeleteBtn.addEventListener('click', ()=>{
    cardElement.remove();
  });

  cardImage.addEventListener('click', ()=>{
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

function handleOpenedEditModal() {
  openModal(popupProfile);
  fillProfileForm(profileTitle.textContent, profileDescription.textContent);
}

function handleOpenedImageModal(name, link){
  openModal(popupImage);
  fillImageInfo(name, link);
} 

function fillImageInfo(name, link){
  let imageElement = popupImage.querySelector(".popup__image");
  let captionElement = popupImage.querySelector(".popup__caption");
  imageElement.alt = name;
  captionElement.textContent = name;
  imageElement.src = link;
}

popupForm.addEventListener("submit", handleProfileFormSubmit);
popupAddForm.addEventListener("submit", handleCardFormSubmit);

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

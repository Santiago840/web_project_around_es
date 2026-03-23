import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  configForm,
  formValids,
  profileEditBtn,
  profileAddBtn,
  formEdit,
  formAddCard,
  popupInputName,
  popupInputDescription,
} from "../utils/constants.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        () => {
          popupImage.open({ name: item.name, link: item.link });
        },
        "#template-card",
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards__list",
);

const infoUser = new UserInfo({
  selectorName: ".profile__title",
  selectorJob: ".profile__description",
});

const popupImage = new PopupWithImage("#image-popup");

const popupEditForm = new PopupWithForm((inputValues) => {
  infoUser.setUserInfo({
    name: inputValues.name,
    job: inputValues.description,
  });
  popupEditForm.close();
}, "#edit-popup");

const popupCardForm = new PopupWithForm((inputValues) => {
  const card = new Card(
    inputValues["place-name"],
    inputValues.link,
    () => {
      popupImage.open({
        name: inputValues["place-name"],
        link: inputValues.link,
      });
    },
    "#template-card",
  );

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);

  popupCardForm.close();
}, "#new-card-popup");

(function initialize() {
  cardList.renderItems();
  setEventListeners();
  validateForms();
})();

function validateForms() {
  const forms = document.querySelectorAll(".popup__form");

  forms.forEach((form) => {
    const formValidated = new FormValidator(configForm, form);
    formValidated.setEventListeners();
    formValids[form.id] = formValidated;
  });
}

function fillProfileForm(data) {
  popupInputName.value = data.name;
  popupInputDescription.value = data.job;
}

function handleOpenedEditModal() {
  fillProfileForm(infoUser.getUserInfo());
  formValids[formEdit.id].resetValidation();
  popupEditForm.open();
}

function handleOpenedAddCardModal() {
  formValids[formAddCard.id].resetValidation();
  popupCardForm.open();
}

function setEventListeners() {
  profileAddBtn.addEventListener("click", handleOpenedAddCardModal);

  profileEditBtn.addEventListener("click", handleOpenedEditModal);

  popupImage.setEventListeners();
  popupEditForm.setEventListeners();
  popupCardForm.setEventListeners();
}

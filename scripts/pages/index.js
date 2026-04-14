import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  configForm,
  formValids,
  profileEditBtn,
  profileAddBtn,
  formEdit,
  formAddCard,
  popupInputName,
  popupInputDescription,
  api,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const initialCards = [];
api.getInitialCards().then((res) => {
  initialCards.push(...res);
  cardList.renderItems();
});

api.getUserInfo().then((res) => {
  infoUser.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar });
});

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
        (handlerConfirm) => {
          popupDeleteCard.setConfirmHandler(handlerConfirm);
          popupDeleteCard.open();
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
  selectorAvatar: ".profile__image",
});

const popupImage = new PopupWithImage("#image-popup");

const popupEditForm = new PopupWithForm((inputValues) => {
  api
    .updateUserInfo({ name: inputValues.name, about: inputValues.description })
    .then((res) => {
      infoUser.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
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
    (handlerConfirm) => {
      popupDeleteCard.setConfirmHandler(handlerConfirm);
      popupDeleteCard.open();
    },
    "#template-card",
  );
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);

  api
    .addCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    })
    .then((res) => {
      console.log(res);
    });
  popupCardForm.close();
}, "#new-card-popup");

const popupDeleteCard = new PopupWithConfirmation("#delete-popup");

(function initialize() {
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
  popupDeleteCard.setEventListeners();
}

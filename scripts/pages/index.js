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
  profileEditImageBtn,
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
        item._id,
        item.name,
        item.link,
        item.isLiked,
        () => {
          popupImage.open({ name: item.name, link: item.link });
        },
        (handlerConfirm) => {
          handleDeletedCardModal(item._id, handlerConfirm);
        },
        () => {
          if (!item.isLiked) {
            api
              .updateLike(item._id)
              .then((res) => {
                item.isLiked = res.isLiked;
              })
              .catch((err) => console.log(err));
          } else {
            api
              .deleteLike(item._id)
              .then((res) => {
                item.isLiked = res.isLiked;
              })
              .catch((err) => console.log(err));
          }
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
  popupEditForm.renderLoading(true);
  api
    .updateUserInfo({ name: inputValues.name, about: inputValues.description })
    .then((res) => {
      infoUser.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
    })
    .finally(() => {
      popupEditForm.renderLoading(false);
      popupEditForm.close();
    });
}, "#edit-popup");

const popupCardForm = new PopupWithForm((inputValues) => {
  popupCardForm.renderLoading(true);
  api
    .addCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    })
    .then((res) => {
      const id = res._id;
      const name = res.name;
      const link = res.link;
      let isLiked = res.isLiked;
      const card = new Card(
        id,
        name,
        link,
        isLiked,
        () => {
          popupImage.open({
            name,
            link,
          });
        },
        (handlerConfirm) => {
          handleDeletedCardModal(id, handlerConfirm);
        },
        () => {
          if (!isLiked) {
            api
              .updateLike(id)
              .then((res) => {
                isLiked = res.isLiked;
              })
              .catch((err) => console.log(err));
          } else {
            api
              .deleteLike(id)
              .then((res) => {
                isLiked = res.isLiked;
              })
              .catch((err) => console.log(err));
          }
        },
        "#template-card",
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    })
    .finally(() => {
      popupCardForm.renderLoading(false);
      popupCardForm.close();
    });
}, "#new-card-popup");

const popupDeleteCard = new PopupWithConfirmation("#delete-popup");

const popupEditImageProfile = new PopupWithForm((inputValues) => {
  popupEditImageProfile.renderLoading(true);
  api
    .updateUserImage({ avatar: inputValues.link })
    .then((res) => {
      infoUser.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
    })
    .finally(() => {
      popupEditImageProfile.renderLoading(false);
      popupEditImageProfile.close();
    });
}, "#edit-profile-image-popup");

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

function handleDeletedCardModal(id, handlerConfirm) {
  popupDeleteCard.open();
  popupDeleteCard.setConfirmHandler(() => {
    popupDeleteCard.renderLoading(true);
    api
      .deleteCard(id)
      .then(() => {
        handlerConfirm();
      })
      .finally(() => {
        popupDeleteCard.renderLoading(false);
        popupDeleteCard.close();
      });
  });
}

function handleOpenedEditImageModal() {
  popupEditImageProfile.open();
}

function setEventListeners() {
  profileAddBtn.addEventListener("click", handleOpenedAddCardModal);

  profileEditBtn.addEventListener("click", handleOpenedEditModal);

  profileEditImageBtn.addEventListener("click", handleOpenedEditImageModal);

  popupImage.setEventListeners();
  popupEditForm.setEventListeners();
  popupCardForm.setEventListeners();
  popupDeleteCard.setEventListeners();
  popupEditImageProfile.setEventListeners();
}

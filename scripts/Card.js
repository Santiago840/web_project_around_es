import { openModal } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._toggleLikeBtn();
    });

    this._cardDeleteBtn.addEventListener("click", () => {
      this._removeCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleOpenedImageModal();
    });
  }

  _toggleLikeBtn() {
    this._cardLikeBtn.classList.toggle("card__like-button_is-active");
  }

  _removeCard() {
    this._cardElement.remove();
  }

  _fillImageInfo() {
    const imageElement = document.querySelector(".popup__image");
    const captionElement = document.querySelector(".popup__caption");
    imageElement.alt = this._name;
    imageElement.src = this._link;
    captionElement.textContent = this._name;
  }

  _handleOpenedImageModal() {
    this._fillImageInfo();
    openModal(document.querySelector("#image-popup"));
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button",
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

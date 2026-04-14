export default class Card {
  constructor(
    id,
    name,
    link,
    handleCardClick,
    handleDeleteClick,
    cardSelector,
  ) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._isLiked = false;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
      this._handleDeleteClick(() => {
        this._removeCard();
      });
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _toggleLikeBtn() {
    this._cardLikeBtn.classList.toggle("card__like-button_is-active");
  }

  _removeCard() {
    this._cardElement.remove();
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

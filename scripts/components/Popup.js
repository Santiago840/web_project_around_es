export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._btnClose = this._popupElement.querySelector(".popup__close");
    this._btnConfirm = this._popupElement.querySelector(".popup__button");
  }

  _hanldeEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_is-opened");
  }

  close() {
    this._popupElement.classList.remove("popup_is-opened");
  }

  renderLoading(isLoading, message = "Guardando...") {
    if (isLoading) {
      this._btnConfirm.disabled = true;
      this._btnConfirm.textContent = message;
    } else {
      this._btnConfirm.disabled = false;
      this._btnConfirm.textContent = this._btnText;
    }
  }

  setEventListeners() {
    this._btnClose.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });

    document.addEventListener("keydown", (evt) => {
      this._hanldeEscClose(evt);
    });
  }
}

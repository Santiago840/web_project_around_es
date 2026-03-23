export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._btnClose = this._popupElement.querySelector(".popup__close");
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

  setEventListeners() {
    this._btnClose.addEventListener("click", ()=>{
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

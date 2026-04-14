import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._btnConfirm = this._popupElement.querySelector(".popup__button");
  }

  setConfirmHandler(handler) {
    this._handler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnConfirm.addEventListener("click", () => {
      if (this._handler) {
        this._handler();
      }
      this.close();
    });
  }
}

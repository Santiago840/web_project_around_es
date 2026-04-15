import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._btnText = this._btnConfirm.textContent;
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
    });
  }
}

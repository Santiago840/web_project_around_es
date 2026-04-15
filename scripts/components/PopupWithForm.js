import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitForm, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._btnConfirm = this._popupElement.querySelector(".popup__button");
    this._btnText = this._btnConfirm.textContent;
  }

  _getInputValues() {
    const inputList = this._formElement.querySelectorAll(".popup__input");
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input["name"]] = input.value;
    });

    return inputValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading, message = "Guardando...") {
    this._btnConfirm.disabled = true;
    isLoading
      ? (this._btnConfirm.textContent = message)
      : (this._btnConfirm.textContent = this._btnText);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}

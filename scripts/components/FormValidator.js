export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(
      this._config.inputClass,
    );
    this._submitBtn = this._formElement.querySelector(this._config.btnSelector);
    this._errorClass = this._config.errorClass;
    this._errorClassActive = this._config.errorClassActive;
  }

  _showInputError(input, errorElement) {
    input.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClassActive);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this._errorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClassActive);
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(function (input) {
      return !input.validity.valid;
    });
  }

  _checkValidityInput(input) {
    const errorElement = this._formElement.querySelector(
      `.${input.id}-input-error`,
    );
    if (!input.checkValidity()) {
      this._showInputError(input, errorElement);
    } else {
      this._hideInputError(input, errorElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.disabled = true;
    } else {
      this._submitBtn.disabled = false;
    }
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      const errorElement = this._formElement.querySelector(
        `.${input.id}-input-error`,
      );
      this._hideInputError(input, errorElement);
    });

    this._submitBtn.disabled = true;
  }

  setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValidityInput(input);
        this._toggleButtonState();
      });
    });
  }
}

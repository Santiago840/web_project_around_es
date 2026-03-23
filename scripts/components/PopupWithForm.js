import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor (submitForm, popupSelector){
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._popupElement.querySelector(".popup__form");
    }

    _getInputValues(){
        const inputList = this._formElement.querySelectorAll(".popup__input");
        const inputValues = {};
        inputList.forEach(input => {
            inputValues[input['name']] = input.value;
        });

        return inputValues;
    }

    close(){
        super.close();
        this._formElement.reset();
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener("submit", (evt)=>{
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }
}
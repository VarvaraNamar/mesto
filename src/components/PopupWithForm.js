import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._popupSaveButton = this._form.querySelector('.popup__save-button');
    this._popupSaveButtonText = this._popupSaveButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
  renderLoading(isLoading) {
    if(isLoading) {
      this._popupSaveButton.textContent = 'Сохранение...'
    } else {
      this._popupSaveButton.textContent = this._popupSaveButtonText
    }
  }
  
  close() {
    super.close();
    this._form.reset();
  }//перезапись открытия попапа увеличения картнки
}

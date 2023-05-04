import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitCallback();
      this.close();
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
}
import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSaveButton = this._popupForm.querySelector('.popup__save-button');
    this._popupSaveButtonText = this._popupSaveButton.textContent;
  }


}
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = this._popup.querySelector('.popup__zoom-title');
    this._popupImage = this._popup.querySelector('.popup__zoom-image');
  }

  open(name, link) {
    super.open();
    this._popupTitle.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name; 
  }//перезапись открытия попапа увеличения картнки
}


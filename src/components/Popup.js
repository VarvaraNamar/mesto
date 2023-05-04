export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose);
  }// открытие попапа
  
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose);
  }// закрытие попапа

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }//функция закрытия попапа на эскейп

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }//закрытие по клику на слое вне попапа

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close.bind(this));// закрытие попапов по крестику
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));//слушатель на оверлей
  }

}

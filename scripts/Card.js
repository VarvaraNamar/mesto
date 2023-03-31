class Card {
  constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  }

  createCard() { 
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.element__title').textContent = this._name; 
    this._newCard.querySelector('.element__image').src = this._link;// картинка в карточке 
    this._newCard.querySelector('.element__image').alt = this._name;
    this._newCardDeleteButton = this._newCard.querySelector('.element__delete-button');// кнопка удаления карточки
    this._newCardLikeButton = this._newCard.querySelector('.element__like-button');// кнопка лайка 

    this._setEventListeners();

    return this._newCard
  }//создание карточки из шаблона

  _likeCard() { 
    this._newCardLikeButton.classList.toggle('element__like-button_active'); 
  }//функция лайка 

  _deleteCard() {
    this._newCard.remove()
  }//функция удаления карточек 

  _zoomCard() {
    this._handleCardClick({
      link: this._link,
      name: this._name,
    });
  }//функция зум

  _setEventListeners() {
    this._newCardLikeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._newCardDeleteButton.addEventListener('click',() => {
      this._deleteCard();
    });
    this._newCard.addEventListener('click', () => {
      this._zoomCard();
    });
  };//слушатели
 
} 

export {Card};
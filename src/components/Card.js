export class Card {
  constructor({data, handleCardClick}, templateSelector) {
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

  renderCard() { 
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.element__title').textContent = this._name;
    this._newCardImage = this._newCard.querySelector('.element__image');//картинка карточки
    this._newCardImage.src = this._link;// картинка в карточке 
    this._newCardImage.alt = this._name;
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

  _setEventListeners() {
    this._newCardLikeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._newCardDeleteButton.addEventListener('click',() => {
      this._deleteCard();
    });
    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };//слушатели
 
} 
// 

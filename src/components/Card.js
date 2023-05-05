export class Card {
  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick},  templateSelector, userId) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this.cardId = data._id // id карточки
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick; 
      this._ownerId = data.owner._id // id владельца
      this._userId = userId // id текущего юзера 
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
  return cardElement;
  }//получение темплейта

  setLike() {
    this._newCardLikeButton.classList.add("element__like-button_active");
    // this.isLiked = true;
  }

  removeLike() {
    this._newCardLikeButton.classList.remove("element__like-button_active");
    // this.isLiked = false;
  }

  countLikes(data) {
    this._newCardCountLikeElement.textContent = data.likes.length;
    this._likes = data.likes
  }
  
  isLiked(){
    return this._likes.some((item) => item._id === this._userId)
  }

  _checkUserLike() {
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this.setLike()
      } else {
        this.removeLike()
      }
    })
  }

  renderCard() { 
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.element__title').textContent = this._name;
    this._newCardImage = this._newCard.querySelector('.element__image');//картинка карточки
    this._newCardImage.src = this._link;// картинка в карточке 
    this._newCardImage.alt = this._name;
    this._newCardDeleteButton = this._newCard.querySelector('.element__delete-button');// кнопка удаления карточки
    if (this._ownerId !== this._userId) {
      this._newCardDeleteButton.remove()
    }
    this._newCardLikeButton = this._newCard.querySelector('.element__like-button');// кнопка лайка 
    this._newCardCountLikeElement = this._newCard.querySelector('.element__like-count');
    this._newCardCountLikeElement.textContent = this._likes.length;
    this._setEventListeners();
    this._checkUserLike()
    return this._newCard
  }//создание карточки из шаблона

  deleteCard() {
    this._newCard.remove()
  }//функция удаления карточек 

  _setEventListeners() {
    this._newCardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._newCardDeleteButton.addEventListener('click',() => {
      this._handleDeleteClick(this);
    });
    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };//слушатели
 
} 

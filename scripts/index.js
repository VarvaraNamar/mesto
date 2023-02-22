let popupProfile = document.querySelector('.popup');// попап профайла
let profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы (ручка)
let profileCloseButton = document.querySelector('.popup__close-button');// кнопка закрытия формы (крестик)
let userName = document.querySelector('.profile__name');// юзер в профайле
let userJob = document.querySelector('.profile__caption');// работа в профайле
let formProfile = document.querySelector('.popup__form');// сама форма
let nameInput = document.querySelector('.popup__input_type_name');// инпут имя
let jobInput = document.querySelector('.popup__input_type_occupation');// инпут работа

let popupAddCard = document.querySelector('.popup_add-card');// попап добавления карточки
let profileAddButton = document.querySelector('.profile__add-button');// кнопка добавления карточки
let addCardCloseButton = document.querySelector('.popup__close-button_add-card');// кнопка закрытия формы карт
let formAddCard = document.querySelector('.popup__form_add-card');// форма добавления карточки
let cardsList = document.querySelector('.elements');// список с карточками

let popupZoomImage = document.querySelector('.popup_zoom-card');//попап фото приближения
let popupZoomCardCloseButton = document.querySelector('.popup__close-button_zoom-card');//кнопка закрытия зум-папопа
let imageZoom = document.querySelector('.popup__zoom-image');//картинка попапа зум
let titleZoom = document.querySelector('.popup__zoom-title');//описание картинки зум

const initialCards = [
  {
    name: 'Сочи',
    link: '../images/sochi.JPG'
  },
  {
    name: 'Алтай',
    link: '../images/altai.JPG'
  },
  {
    name: 'Байкал',
    link: '../images/baikal.JPG'
  },
  {
    name: 'Териберка',
    link: '../images/teriberka.JPG'
  },
  {
    name: 'Крым',
    link: '../images/krim.JPG'
  },
  {
    name: 'Камчатка',
    link: '../images/kamchatka.JPG'
  }
];

function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);// копируем темплэйт карточки
  const cardTitle = cardTemplate.querySelector('.element__title');// название карточки
  cardTitle.textContent = card.name;
  const cardImage = cardTemplate.querySelector('.element__image');// картинка в карточке
  cardImage.setAttribute('src', card.link);
  cardImage.addEventListener('click', function(evt) {
    imageZoom.src = evt.target.src;
    titleZoom.textContent = card.name;
    openPopup(popupZoomImage);});
  const cardDeleteButton = cardTemplate.querySelector('.element__delete-button');// кнопка удаления карточки
  cardDeleteButton.addEventListener('click',deleteButtonClick);// слушатель на кнопку удаления
  const cardLikeButton = cardTemplate.querySelector('.element__like-button');// кнопка лайка
  cardLikeButton.addEventListener('click',likeButtonClick);// слушатель на кнопку лайка
  cardsList.prepend(cardTemplate);
}

initialCards.forEach(createCard);// 6 карточек из массива

function deleteButtonClick(evt) {
  const button = evt.target;
  const card = button.closest('.element');
  card.remove()
}//функция удаления карточек

function likeButtonClick(evt) {
  const button = evt.target;
  const like = button.closest('.element__like-button');
  like.classList.toggle('element__like-button_active');
}//функция лайка

function addCard(evt) {
  evt.preventDefault();
  const formAddCard = evt.target;
  const name = formAddCard.querySelector('.popup__input_card_title').value;
  const link = formAddCard.querySelector('.popup__input_card_link').value;
  const newCard = {name, link};
  createCard(newCard);
  closePopup(popupAddCard);
}//сабмит формы = добавление карточки

function render() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
};// стартовые значения из профайла

function openPopup(popup) {
  popup.classList.add('popup_opened');
  render();
};// открытие формы со стартовыми значениями

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};// закрытие формы 

function formSubmit (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popupProfile);
};//отправка-сохранение формы

profileEditButton.addEventListener('click', function() {
  openPopup(popupProfile);
});//слушатель на кнопку редактирования формы

profileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile);
});// слушатель на кнопку закрытия формы

formProfile.addEventListener('submit', formSubmit);// слушатель на форму, сохранить данные

profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});//слушатель на кнопку плюс добавления карточки

addCardCloseButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});// слушатель на кнопку закрытия формы

formAddCard.addEventListener('submit', addCard)//слушатель на форму добавления карточки

popupZoomCardCloseButton.addEventListener('click',function() {
  closePopup(popupZoomImage);
});




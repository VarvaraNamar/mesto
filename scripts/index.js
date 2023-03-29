import { initialCards, validationConfig } from './constants.js';
import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

const popupProfile = document.querySelector('.popup_type_profile');// попап профайла
const popupAddCard = document.querySelector('.popup_type_card');// попап добавления карточки
const popupZoomImage = document.querySelector('.popup_type_zoom-image');//попап фото приближения
const popupList = document.querySelectorAll('.popup');//коллекция попапов
const popupCloseButtonList = document.querySelectorAll('.popup__close-button');// кнопки закрытия форм (крестики)
const profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы профайла (ручка)
const userName = document.querySelector('.profile__name');// юзер в профайле
const userJob = document.querySelector('.profile__caption');// работа в профайле
const cardAddButton = document.querySelector('.profile__add-button');// кнопка добавления карточки
const formProfile = document.querySelector('.popup__form_type_profile');// форма профайла
const formAddCard = document.querySelector('.popup__form_type_card');// форма добавления карточки
const nameInput = document.querySelector('.popup__input_type_name');// инпут имя
const jobInput = document.querySelector('.popup__input_type_job');// инпут работа
const formAddCardTitleInput = formAddCard.querySelector('.popup__input_type_card-title');// инпут названия карточки
const formAddCardLinkInput = formAddCard.querySelector('.popup__input_type_card-link');// инпут ссылки на фото карточки
const cardsList = document.querySelector('.elements');// список с карточками
const imageZoom = document.querySelector('.popup__zoom-image');//картинка попапа зум
const titleZoom = document.querySelector('.popup__zoom-title');//описание картинки зум

const inputList = Array.from(document.querySelectorAll('.popup__input'));
const buttonElement = popupAddCard.querySelector('.popup__save-button');
const errorList = document.querySelectorAll('.popup__error');

const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();//элемент класса формвалидатор

const formAddCardValidation = new FormValidator(validationConfig, formAddCard);
formAddCardValidation.enableValidation();//элемент класса формвалидатор

function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown',pushButtonEscape);//слушатель на клаву
};// открытие попапа

function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown',pushButtonEscape);
};// закрытие попапа 

popupCloseButtonList.forEach((button) => {
  button.addEventListener('click', function() {
    const popupClosest = button.closest('.popup_opened');
    closePopup(popupClosest);
  });
})// закрытие попапов по крестику

popupList.forEach((item) => { 
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item);
    };
  });
})//закрытие по клику на слое вне попапа

function pushButtonEscape(evt){
  if (evt.key === 'Escape') {
    const popupClosest = document.querySelector('.popup_opened');
    closePopup(popupClosest);
  };
};//функция закрытия попапа на эскейп



const createCard = (data) => {
  const card = new Card(data, "#card-template", zoomImage);
  return card.createCard();
};//создание элемента класса Кард

initialCards.forEach((data) => {  
  cardsList.append(createCard(data)) 
});//перебор массива

const renderCard = (card) => {
  cardsList.prepend(createCard(card));
};//карту в список

function addCard(evt) { 
  evt.preventDefault(); 
  const formAddCard = evt.target; 
  const cardTitle = formAddCardTitleInput.value; 
  const cardLink = formAddCardLinkInput.value; 
  renderCard({
    name: cardTitle,
    link: cardLink,
  });
  closePopup(popupAddCard);
  formAddCard.reset();
  toggleButtonState();
}//сабмит формы = добавление карточки 

function zoomImage (cardImage) {
  imageZoom.src = cardImage.link; 
  imageZoom.alt = cardImage.name;
  titleZoom.textContent = cardImage.name;
  openPopup(popupZoomImage);
}//функция увеличения фото

function submitFormProfile (evt) { 
  evt.preventDefault(); 
  userName.textContent = nameInput.value; 
  userJob.textContent = jobInput.value; 
  closePopup(popupProfile); 
};//отправка-сохранение формы профайла

function renderProfilePopup() { 
  nameInput.value = userName.textContent; 
  jobInput.value = userJob.textContent; 
};// стартовые значения из профайла 

function renderAddCardPopup() {
  formAddCardTitleInput.value = "";
  formAddCardLinkInput.value = "";
}

//слушатели

profileEditButton.addEventListener('click', function() { 
  formProfileValidation.removeErrors();
  openPopup(popupProfile); 
  renderProfilePopup(); 
});//слушатель на кнопку редактирования формы 

formProfile.addEventListener('submit', submitFormProfile);// слушатель на форму, сохранить данные 

cardAddButton.addEventListener('click', function() { 
  formAddCardValidation.removeErrors();
  openPopup(popupAddCard); 
  renderAddCardPopup()
});//слушатель на кнопку плюс добавления карточки 

formAddCard.addEventListener('submit', addCard)//слушатель на форму добавления карточки 





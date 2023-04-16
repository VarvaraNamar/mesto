import '../pages/index.css';

import { initialCards, validationConfig } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы профайла (ручка)
const cardAddButton = document.querySelector('.profile__add-button');// кнопка добавления карточки
const formProfile = document.querySelector('.popup__form_type_profile');// форма профайла
const formAddCard = document.querySelector('.popup__form_type_card');// форма добавления карточки
const nameInput = document.querySelector('.popup__input_type_name');// инпут имя
const jobInput = document.querySelector('.popup__input_type_job');// инпут работа

const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();//элемент класса формвалидатор

const formAddCardValidation = new FormValidator(validationConfig, formAddCard);
formAddCardValidation.enableValidation();//элемент класса формвалидатор

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image');
popupZoomImage.setEventListeners();//элемент попапа приближения картинки

const userInfo = new UserInfo('.profile__name', '.profile__caption');//элемент класса информации о пользователе

const popupProfile = new PopupWithForm('.popup_type_profile', submitFormProfile)
popupProfile.setEventListeners();//элемент попапа-формы профайла

function submitFormProfile (data) {  
  userInfo.setUserInfo(data);
};//отправка-сохранение формы профайла

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo()
  popupProfile.open();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  formProfileValidation.removeErrors();
});//слушатель на кнопку редактирования формы 

const popupAddCard = new PopupWithForm('.popup_type_card', submitFormAddCard)
popupAddCard.setEventListeners();//элемент попапа-формы добавления карточки

function submitFormAddCard(data) {
  const card = createCard(data);
  cardsList.addItem(card);
  formAddCardValidation.removeErrors();
};//отправка-сохранение формы карточки

cardAddButton.addEventListener("click", () => {
  popupAddCard.open();
  formAddCardValidation.removeErrors();
});//слушатель на кнопку плюс(добавления карточки)

function openImagePopup(name, link) {
  popupZoomImage.open(name, link);
};//открытие попапа приближения картинки

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: openImagePopup},
    "#card-template");
  return card.renderCard();
};//создание элемента класса Кард

const cardsList = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  },
}, '.elements');
cardsList.renderItems();//добавление карточек в разметку

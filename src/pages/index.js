import '../pages/index.css';

import { initialCards, validationConfig } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы профайла (ручка)
const cardAddButton = document.querySelector('.profile__add-button');// кнопка добавления карточки
const formProfile = document.querySelector('.popup__form_type_profile');// форма профайла
const formAddCard = document.querySelector('.popup__form_type_card');// форма добавления карточки
export const nameInput = document.querySelector('.popup__input_type_name');// инпут имя
export const jobInput = document.querySelector('.popup__input_type_job');// инпут работа
export const avatarInput = document.querySelector('.popup__input_type_avatar-link')
export const profileAvatarSelector = document.querySelector('.profile__avatar');
export const profileNameSelector = document.querySelector('.profile__name');
export const profileAboutSelector = document.querySelector('.profile__caption');

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "7c8da599-6aba-41f7-81de-e4912bb02751",
    "Content-Type": "application/json"
  }
})

const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();//элемент класса формвалидатор

const formAddCardValidation = new FormValidator(validationConfig, formAddCard);
formAddCardValidation.enableValidation();//элемент класса формвалидатор

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image');
popupZoomImage.setEventListeners();//элемент попапа приближения картинки

const userInfo = new UserInfo('.profile__name', '.profile__caption', '.profile__avatar');//элемент класса информации о пользователе

const popupProfile = new PopupWithForm('.popup_type_profile', submitFormProfile)
popupProfile.setEventListeners();//элемент попапа-формы профайла

function submitFormProfile (data) {  
  userInfo.setUserInfo(data);
};//отправка-сохранение формы профайла

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo()
  popupProfile.open();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formProfileValidation.removeErrors();
});//слушатель на кнопку редактирования формы 

const formAvatar = document.querySelector('.popup__form_type_avatar');//форма аватара
const formAvatarValidation = new FormValidator(validationConfig, formAvatar);
formAvatarValidation.enableValidation();//элемент класса формвалидатор

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', submitFormAvatar);
popupAvatarEdit.setEventListeners();


function submitFormAvatar (data) {  
  userInfo.setUserAvatar(data);
  };//отправка-сохранение формы аватара

const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
avatarEditButton.addEventListener('click', () => {
  formAvatarValidation.removeErrors()
  popupAvatarEdit.open()
})//открытие попапа смены аватара

let userId // переменная под id пользователя

api.getStartData() 
  .then(([userData, cards] ) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
    cardsList.renderItems(cards)
  })
  .catch((err) => console.log(err))// возвращает результат промисов карточки и информация 


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


const cards = api.getInitialCards();
cards
  .then((res) => {
    let i = 0;
    res.reverse().forEach((item) => {
      item.isUser = (userInfo._id === res[i].owner._id);
      cardsList.addItem(createCard(item));
      i++;
    });
    return res;
  })
  .catch((err) => console.log(`Error: ${err}`));


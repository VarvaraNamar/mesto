import '../pages/index.css';

import { validationConfig } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm';

const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка открытия формы профайла (ручка)
const cardAddButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const avatarEditButton = document.querySelector('.profile__avatar-edit-button'); //кнопка смены аватара

const formProfile = document.querySelector('.popup__form_type_profile'); // форма профайла
const formAddCard = document.querySelector('.popup__form_type_card'); // форма добавления карточки
const formAvatar = document.querySelector('.popup__form_type_avatar'); //форма аватара
const formDeleteConfirm = document.querySelector('.popup__form_type_confirm');

export const nameInput = document.querySelector('.popup__input_type_name'); // инпут имя
export const jobInput = document.querySelector('.popup__input_type_job'); // инпут работа
export const avatarInput = document.querySelector('.popup__input_type_avatar-link'); //инпут аватар

export const profileAvatarSelector = document.querySelector('.profile__avatar');
export const profileNameSelector = document.querySelector('.profile__name');
export const profileAboutSelector = document.querySelector('.profile__caption');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '7c8da599-6aba-41f7-81de-e4912bb02751',
    'Content-Type': 'application/json'
  }
});

const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation(); //элемент класса формвалидатор

const formAddCardValidation = new FormValidator(validationConfig, formAddCard);
formAddCardValidation.enableValidation(); //элемент класса формвалидатор

const formAvatarValidation = new FormValidator(validationConfig, formAvatar);
formAvatarValidation.enableValidation(); //элемент класса формвалидатор

const userInfo = new UserInfo('.profile__name', '.profile__caption', '.profile__avatar'); //элемент класса информации о пользователе

const popupProfile = new PopupWithForm('.popup_type_profile', newValues => {
  popupProfile.renderLoading(true);
  api
    .setUserInfoApi(newValues)
    .then(data => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupProfile.renderLoading(false));
});
popupProfile.setEventListeners(); //элемент попапа-формы профайла

let userId; // переменная под id пользователя

api
  .getStartData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err)); // возвращает результат промисов карточки и информация

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupProfile.open();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formProfileValidation.removeErrors();
}); //слушатель на кнопку редактирования профайла

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', newValues => {
  popupAvatarEdit.renderLoading(true);
  api
    .setUserAvatarApi(newValues)
    .then(data => {
      userInfo.setUserAvatar(data);
      // popupAvatarEditFromValidator.disableSubmitButton()
      popupAvatarEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatarEdit.renderLoading(false));
});
popupAvatarEdit.setEventListeners(); //элемент попапа-формы аватара

avatarEditButton.addEventListener('click', () => {
  formAvatarValidation.removeErrors();
  popupAvatarEdit.open();
}); //слушатель на кнопку смены аватара

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image');
popupZoomImage.setEventListeners(); //элемент попапа приближения картинки

const cardsList = new Section(
  {
    renderer: item => {
      cardsList.addItem(createCard(item));
    }
  },
  '.elements'
); //элемент секшн

cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  formAddCardValidation.removeErrors();
}); //слушатель на кнопку плюс(добавления карточки)

const popupAddCard = new PopupWithForm('.popup_type_card', newValues => {
  popupAddCard.renderLoading(true);
  api
    .addNewCard(newValues)
    .then(data => {
      const card = createCard(data);
      cardsList.addItem(card);
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners(); //элемент попапа-формы добавления карточки

function openImagePopup(name, link) {
  popupZoomImage.open(name, link);
} //открытие попапа приближения картинки

const popupConfirmDelete = new PopupWithConfirm('.popup_type_confirm');
popupConfirmDelete.setEventListeners(); //попап подтверждения удаления

function handleDelete(card) {
  const submitFormConfirm = () => {
    api
      .deleteCard(card.cardId)
      .then(response => {
        card.deleteCard(response);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  };
  popupConfirmDelete.setSubmitAction(submitFormConfirm);
  popupConfirmDelete.open();
} //функция удаления карточки

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .removeLikeCard(card.cardId)
      .then(response => {
        card.removeLike();
        card.countLikes(response);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  } else {
    api
      .setLikeCard(card.cardId)
      .then(response => {
        card.setLike();
        card.countLikes(response);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }
} //функция лайка карточки

const createCard = data => {
  const card = new Card(
    {
      data: data,
      handleCardClick: openImagePopup,
      handleDeleteClick: handleDelete,
      handleLikeClick: handleLikeClick
    },
    '#card-template',
    userId
  );
  return card.renderCard();
}; //создание элемента класса Кард

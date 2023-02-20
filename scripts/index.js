let popupProfile = document.querySelector('.popup');// попап профайла
let profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы (ручка)
let profileCloseButton = document.querySelector('.popup__close-button');// кнопка закрытия формы (крестик)
let userName = document.querySelector('.profile__name');// юзер в профайле
let userJob = document.querySelector('.profile__caption');// работа в профайле
let formElement = document.querySelector('.popup__form');// сама форма
let nameInput = document.querySelector('.popup__input_type_name');// инпут имя
let jobInput = document.querySelector('.popup__input_type_occupation');// инпут работа

let popupAddCard = document.querySelector('.popup_add-card');// попап добавления карточки
let profileAddButton = document.querySelector('.profile__add-button');// кнопка добавления карточки
let addCardCloseButton = document.querySelector('.popup__close-button_add-card');// кнопка закрытия формы карт
let cardImage = document.querySelector('.element__image');// картинка в карточке
let cardTitle = document.querySelector('.element__title');// название карточки
let titleInput = document.querySelector('.popup__input_card_title');// инпут название карточки
let imageInput = document.querySelector('.popup__input_card_link');// инпут ссылка на картинку

let likeButton = document.querySelector('.element__like-button');// кнопка лайка


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

formElement.addEventListener('submit', formSubmit);// слушатель на форму, сохранить данные

profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});//слушатель на кнопку добавления карточки

addCardCloseButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});// слушатель на кнопку закрытия формы

likeButton.addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__like-button_active');
});// слушатель на кнопку лайка


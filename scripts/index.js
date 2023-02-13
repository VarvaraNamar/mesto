let popupLayer = document.querySelector('.popup');// слой с фоном и попапом
let profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы (ручка)
let profileCloseButton = document.querySelector('.popup__close-button');// кнопка закрытия формы (крестик)
let userName = document.querySelector('.profile__name');// юзер в профайле
let userJob = document.querySelector('.profile__caption');// работа в профайле
let formElement = document.querySelector('.popup__form');// сама форма
let nameInput = document.querySelector('.popup__input_type_name');// инпут имя
let jobInput = document.querySelector('.popup__input_type_occupation');// инпут работа

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
    closePopup(popupLayer);
};//отправка-сохранение формы

profileEditButton.addEventListener('click', function() {
  openPopup(popupLayer);
});//слушатель на кнопку редактирования формы

profileCloseButton.addEventListener('click', function() {
  closePopup(popupLayer);
});// слушатель на кнопку закрытия формы

formElement.addEventListener('submit', formSubmit);// слушатель на форму, сохранить данные






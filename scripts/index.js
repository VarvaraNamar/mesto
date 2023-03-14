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
const cardTemplate = document.querySelector('#card-template').content;// копируем темплэйт карточки

const inputList = Array.from(document.querySelectorAll('.popup__input'));
const buttonElement = popupAddCard.querySelector('.popup__save-button');
const errorList = document.querySelectorAll('.popup__error');

// функции

function createCard(card) { 
  const newCard = cardTemplate.cloneNode(true);// копируем темплэйт карточки 
  const cardTitle = newCard.querySelector('.element__title');// название карточки 
  cardTitle.textContent = card.name; 
  const cardImage = newCard.querySelector('.element__image');// картинка в карточке 
  cardImage.setAttribute('src', card.link); 
  cardImage.addEventListener('click', zoomImage);//слушатель на увеличение фото
  const cardDeleteButton = newCard.querySelector('.element__delete-button');// кнопка удаления карточки 
  cardDeleteButton.addEventListener('click',deleteCardButtonClick);// слушатель на кнопку удаления 
  const cardLikeButton = newCard.querySelector('.element__like-button');// кнопка лайка 
  cardLikeButton.addEventListener('click',likeCardButtonClick);// слушатель на кнопку лайка 
  return newCard
};//создание карточки из шаблона

initialCards.forEach((card) => { 
  const newCard = createCard(card) 
  cardsList.append(newCard) 
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
  toggleButtonState(inputList, buttonElement, validationConfig);
}//сабмит формы = добавление карточки 

function deleteCardButtonClick(evt) { 
  const cardDeleteButton = evt.target; 
  const card = cardDeleteButton.closest('.element'); 
  card.remove();
}//функция удаления карточек 

function zoomImage(evt) {
  const cardImage = evt.target;
  const card = evt.target.closest('.element'); 
  const cardTitle = card.querySelector('.element__title').textContent;
  imageZoom.src = cardImage.src; 
  imageZoom.alt = cardImage.alt;
  titleZoom.textContent = cardTitle;
  openPopup(popupZoomImage);
}//функция увеличения фото

function likeCardButtonClick(evt) { 
  const cardlikeButton = evt.target; 
  const likeIcon = cardlikeButton.closest('.element__like-button'); 
  likeIcon.classList.toggle('element__like-button_active'); 
}//функция лайка 

function submitFormProfile (evt) { 
  evt.preventDefault(); 
  userName.textContent = nameInput.value; 
  userJob.textContent = jobInput.value; 
  closePopup(popupProfile); 
};//отправка-сохранение формы 

function renderProfilePopup() { 
  nameInput.value = userName.textContent; 
  jobInput.value = userJob.textContent; 
};// стартовые значения из профайла 

function pushButtonEscape(evt){
  if (evt.key === 'Escape') {
    const popupClosest = document.querySelector('.popup_opened');
    closePopup(popupClosest);
  };
};//функция закрытия на эскейп

function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown',pushButtonEscape);//слушатель на клаву
};// открытие формы со стартовыми значениями 

function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown',pushButtonEscape);
};// закрытие формы  

popupList.forEach((item) => { 
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item);
    };
  });
})//закрытие по клику на слое вне попапа


popupCloseButtonList.forEach((button) => {
  button.addEventListener('click', function() {
    const popupClosest = button.closest('.popup_opened');
    closePopup(popupClosest);
    errorList.forEach((error) => {
      error.textContent = '';
    });
  });
})// закрытие попапов по крестику


//слушатели

profileEditButton.addEventListener('click', function() { 
  openPopup(popupProfile); 
  renderProfilePopup(); 
});//слушатель на кнопку редактирования формы 

formProfile.addEventListener('submit', submitFormProfile);// слушатель на форму, сохранить данные 

cardAddButton.addEventListener('click', function() { 
  openPopup(popupAddCard); 
  formAddCard.reset();
});//слушатель на кнопку плюс добавления карточки 

formAddCard.addEventListener('submit', addCard)//слушатель на форму добавления карточки 






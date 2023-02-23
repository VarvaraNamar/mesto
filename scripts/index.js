const popupProfile = document.querySelector('.popup');// попап профайла
const profileEditButton = document.querySelector('.profile__edit-button');// кнопка открытия формы (ручка)
const profileCloseButton = document.querySelector('.popup__close-button');// кнопка закрытия формы (крестик)
const userName = document.querySelector('.profile__name');// юзер в профайле
const userJob = document.querySelector('.profile__caption');// работа в профайле
const formProfile = document.querySelector('.popup__form');// сама форма
const nameInput = document.querySelector('.popup__input_type_name');// инпут имя
const jobInput = document.querySelector('.popup__input_type_occupation');// инпут работа

const popupAddCard = document.querySelector('.popup_add-card');// попап добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');// кнопка добавления карточки
const addCardCloseButton = document.querySelector('.popup__close-button_add-card');// кнопка закрытия формы карт
const formAddCard = document.querySelector('.popup__form_add-card');// форма добавления карточки
const formAddCardTitleInput = formAddCard.querySelector('.popup__input_card_title')
const formAddCardLinkInput = formAddCard.querySelector('.popup__input_card_link')
const cardsList = document.querySelector('.elements');// список с карточками

const popupZoomImage = document.querySelector('.popup_zoom-card');//попап фото приближения
const popupZoomCardCloseButton = document.querySelector('.popup__close-button_zoom-card');//кнопка закрытия зум-папопа
const imageZoom = document.querySelector('.popup__zoom-image');//картинка попапа зум
const titleZoom = document.querySelector('.popup__zoom-title');//описание картинки зум

const cardTemplate = document.querySelector('#card-template').content;// копируем темплэйт карточки
 
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
  formAddCard.reset()
}//сабмит формы = добавление карточки 

function deleteCardButtonClick(evt) { 
  const cardDeleteButton = evt.target; 
  const card = cardDeleteButton.closest('.element'); 
  card.remove() 
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

function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
};// открытие формы со стартовыми значениями 

function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
};// закрытие формы  


//слушатели

profileEditButton.addEventListener('click', function() { 
  openPopup(popupProfile); 
  renderProfilePopup(); 
});//слушатель на кнопку редактирования формы 

profileCloseButton.addEventListener('click', function() { 
  closePopup(popupProfile); 
});// слушатель на кнопку закрытия формы 

formProfile.addEventListener('submit', submitFormProfile);// слушатель на форму, сохранить данные 

cardAddButton.addEventListener('click', function() { 
  openPopup(popupAddCard); 
});//слушатель на кнопку плюс добавления карточки 

formAddCard.addEventListener('submit', addCard)//слушатель на форму добавления карточки 

popupZoomCardCloseButton.addEventListener('click',function() { 
  closePopup(popupZoomImage); 
});//слушатель на закрытие картинки

addCardCloseButton.addEventListener('click', function() { 
  closePopup(popupAddCard); 
  formAddCard.reset()
});// слушатель на кнопку закрытия формы 




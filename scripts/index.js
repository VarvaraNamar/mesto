const initialCards = [ 
  { 
    name: 'Архыз', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' 
  }, 
  { 
    name: 'Челябинская область', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' 
  }, 
  { 
    name: 'Иваново', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' 
  }, 
  { 
    name: 'Камчатка', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' 
  }, 
  { 
    name: 'Холмогорский район', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' 
  }, 
  { 
    name: 'Байкал', 
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
  } 
]; 

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
 

function createCard(card) { 
  const newCard = cardTemplate.cloneNode(true);// копируем темплэйт карточки 
  const cardTitle = newCard.querySelector('.element__title');// название карточки 
  cardTitle.textContent = card.name; 
  const cardImage = newCard.querySelector('.element__image');// картинка в карточке 
  cardImage.setAttribute('src', card.link); 
  cardImage.addEventListener('click', function(evt) { 
    imageZoom.src = evt.target.src; 
    imageZoom.alt = evt.target.alt; 
    titleZoom.textContent = card.name; 
    openPopup(popupZoomImage);}); 
  const cardDeleteButton = newCard.querySelector('.element__delete-button');// кнопка удаления карточки 
  cardDeleteButton.addEventListener('click',deleteCardButtonClick);// слушатель на кнопку удаления 
  const cardLikeButton = newCard.querySelector('.element__like-button');// кнопка лайка 
  cardLikeButton.addEventListener('click',likeCardButtonClick);// слушатель на кнопку лайка 
  cardsList.append(newCard)
  return newCard
} 

initialCards.forEach(createCard);// 6 карточек из массива 


function addCard(evt) { 
  evt.preventDefault(); 
  const formAddCard = evt.target; 
  const name = formAddCardTitleInput.value; 
  const link = formAddCardLinkInput.value; 
  const newCard = {name, link}; 
  createCard(newCard);
  closePopup(popupAddCard);
  formAddCard.reset()
}//сабмит формы = добавление карточки 




// Работающие слушатели

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
}); 

addCardCloseButton.addEventListener('click', function() { 
  closePopup(popupAddCard); 
  formAddCard.reset()
});// слушатель на кнопку закрытия формы 

// работающие функции

function deleteCardButtonClick(evt) { 
  const cardDeleteButton = evt.target; 
  const card = cardDeleteButton.closest('.element'); 
  card.remove() 
}//функция удаления карточек 

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
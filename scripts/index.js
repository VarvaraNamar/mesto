let editPopup = document.querySelector('.popup');
let editProfileButton = document.querySelector('.profile__edit-button');
let editPopupCloseButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__name');
let userOccupation = document.querySelector('.profile__caption');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-occupation');
let popupSubmit = document.querySelector('.popup__save-button');


editProfileButton.addEventListener('click', function() {
  openPopup(editPopup);
});

editPopupCloseButton.addEventListener('click', function() {
  closePopup(editPopup);
});

popupSubmit.addEventListener('click', function() {
  submit(editPopup);
});

function render() {
  nameInput.value = userName.textContent;
  jobInput.value = userOccupation.textContent;
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  render();
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  render();
};

function submit(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
      userName.textContent = nameInput.value;
      userOccupation.textContent = jobInput.value;
};

formElement.addEventListener('submit', handleFormSubmit);





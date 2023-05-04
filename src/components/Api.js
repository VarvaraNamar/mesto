export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//загрузка инфы о пользователе

  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//загрузка данных карточек

  async setUserInfoApi(userData) {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//редактирование профиля

  async setUserAvatarApi(userData) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//новый аватар

  async addNewCard(newData, isUser) {
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        link: newData.link,
        isUser: isUser,
      })
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//добавление новой карточки

  async setLikeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//лайк карточки

  async removeLikeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//снятие лайка

  async deleteCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    if (!res.ok) {
      return await Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }//удаление карточки

  

  getStartData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }//стартовые значения инфо и карточек
}
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { CurrentContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      }).catch((err) => {
        console.error(err)
      })
  })

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  
  return (
    <>
      <CurrentContext.Provider value={currentUser}>
        <Header />
        <Main 
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <PopupWithForm 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name='information' 
          title='Редактировать профиль' 
          buttonText='Сохранить'
          children={
            <>
            <input minLength="2" maxLength="40" className="popup__info popup__info_type_name" type="text" name="name" placeholder="Имя" required />
            <span id="name-error" className="popup__error"></span>
            <input minLength="2" maxLength="200" className="popup__info popup__info_type_job" type="text" name="about" placeholder="Профессия" required />
            <span id="about-error" className="popup__error"></span>
            </>
        }
         />
        <PopupWithForm 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name='card'
          title='Новое место'
          buttonText='Создать'
          children={
            <>
            <input minLength="2" maxLength="30" className="popup__info popup__info_type_mesto" type="text" name="mesto" placeholder="Название" required />
            <span id="mesto-error" className="popup__error"></span>
            <input className="popup__info popup__info_type_link" type="url" name="link" placeholder="Ссылка на картинку" required />
            <span id="link-error" className="popup__error"></span>
            </>
          } />
        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonText='Да'
          children={
            <>
            <p className="popup__text">Вы уверены?</p>
            </>
          } />
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name='avatar'
          title='Обновить аватар'
          buttonText='Сохранить'
          children={
            <>
            <input className="popup__info popup__info_type_avatar" type="url" name="avatar" placeholder="Ссылка на смену аватара" required />
            <span id="avatar-error" className="popup__error"></span>
            </>
          } />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
          />
  
      </CurrentContext.Provider>
    </>
  );
}

export default App;

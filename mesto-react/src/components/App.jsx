import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }
  const [selectedCard, setSelectedCard] = useState(null)
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  return (
    <>
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
      children={
        <>
        <input minlength="2" maxlength="40" className="popup__info popup__info_type_name" type="text" name="name" placeholder="Имя" required />
        <span id="name-error" className="popup__error"></span>
        <input minlength="2" maxlength="200" className="popup__info popup__info_type_job" type="text" name="about" placeholder="Профессия" required />
        <span id="about-error" className="popup__error"></span>
        <button className="popup__button popup__button_type_save" type="submit">Сохранить</button>
        </>
      }
       />
      <PopupWithForm 
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      name='card'
      title='Новое место'
      children={
        <>
        <input minlength="2" maxlength="30" className="popup__info popup__info_type_mesto" type="text" name="mesto" placeholder="Название" required />
        <span id="mesto-error" className="popup__error"></span>
        <input className="popup__info popup__info_type_link" type="url" name="link" placeholder="Ссылка на картинку" required />
        <span id="link-error" className="popup__error"></span>
        <button className="popup__button popup__button_type_add" type="submit">Создать</button>
        </>
      } />
      <PopupWithForm
      name='delete'
      title='Вы уверены?'
      children={
        <>
        <p className="popup__text">Вы уверены?</p>
        <button className="popup__button popup__button_type_delete" type="reset">Да</button>
        </>
      } />
      <PopupWithForm
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      name='avatar'
      title='Обновить аватар'
      children={
        <>
        <input className="popup__info popup__info_type_avatar" type="url" name="avatar" placeholder="Ссылка на смену аватара" required />
        <span id="avatar-error" className="popup__error"></span>
        <button className="popup__button popup__button_type_add" type="submit">Сохранить</button>
        </>
      } />
      {selectedCard && (<ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />)}
  
      
    </>
  );
}

export default App;

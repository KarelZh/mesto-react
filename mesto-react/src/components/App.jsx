import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { CurrentContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState(false);
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      }).catch((err) => {
        console.error(err)
      })
  }, [])
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
  function handleUpdateUser(item) {
    api.setUserInfo(item.name, item.about).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => {
      console.error(err)
    })
  }
  function handleCardLike(likes, id) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.likeCard(id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    }).catch((err) => {
      console.error(err)
    });
   
  }
  function handleDeleteLike(likes, id) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.deleteLikeCard(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    }).catch((err) => {
      console.error(err)
    });
  }
  function handleCardDelete(id) {
    api.deleteCard(id).then((res) => {
      setCards((res) => {return res.filter((n) => {
        return n._id !== id
      })})
      console.log(res)
    })
  }
  function handleUpdateAvatar(item) {
    api.addAvatar(item.avatar).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => {
      console.error(err)
    })
  }
  function handleAddPlaceSubmit(item) {
    api.generateCard(item.mesto, item.link).then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    }).catch((err) => {
      console.error(err)
    })
  }
  return (
    <>
      <CurrentContext.Provider value={currentUser}>
        <Header />
        <Main 
          card={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          deleteCardLike={handleDeleteLike}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonText='Да'
          children={
            <>
            <p className="popup__text">Вы уверены?</p>
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

import ping from '../images/ping.png'
import Card from './Card';
import { api } from '../utils/Api';
import { useState } from 'react';
import { useEffect } from 'react';

function Main({
  onEditProfile, 
  onAddPlace, 
  onEditAvatar,
  onCardClick
  }) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([])
    useEffect(() => {
      api.getUserInfo()
      .then((item) => {
        setUserName(item.name)
        setUserDescription(item.about)
        setUserAvatar(item.avatar)
      }).catch((err) => {
        console.error(err)
      })
    }, [])
    useEffect(() => {
      api.getInitialCards()
      .then((res) => {
        setCards(res)
      }).catch((err) => {
        console.error(err)
      })
    }, [])
  return(
    <main className="content">
      <section className="profile">
        <div className="profile__content" onClick={onEditAvatar}>
          <img className="profile__image" src={userAvatar} alt="Жак-ИвКусто" />
          <img className="profile__ping" src={ping} alt="Ручка" />
        </div>
        <div className="profile__info">
          <div className="profile__save">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}></button>
      </section>
      <section class="elements">
          {cards.map((item) => (
            <Card 
            src={item.link}
            like={item.likes.length}
            title={item.name}
            alt={item.name}
            onClick={onCardClick}
            />
          ))}
      </section>
    </main>
  )
}
export default Main;

function Card({src, alt, title, like, onClick}) {
  return(
    <div className="element">
      <img className="element__image" src={src} alt={alt} onClick={() => onClick({src, alt})}/>
      <button className="element__reset" type="reset"></button>
        <div className="element__info">
          <p className="element__text">{title}</p>
            <div className="element__like">
              <button className="element__button" type="button"></button>
              <span className="element__like_button">{like}</span>
            </div>
        </div>
    </div>
    
  )
}
export default Card;
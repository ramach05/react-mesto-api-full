import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUserContext = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUserContext.id;
  const cardDeleteButtonClassName = `element__trash-button ${
    isOwn ? "element__trash-button_visible" : "element__trash-button_hidden"
  }`;

  const isLiked = props.card.likes.some(
    (like) => like._id === currentUserContext.id
  );

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }
  function handleDeleteClick() {
    props.onConfirmCardDelete(props.card._id);
  }

  return (
    <li className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div
        className="element__photo"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      ></div>
      <div className="element__box">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__box-in-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

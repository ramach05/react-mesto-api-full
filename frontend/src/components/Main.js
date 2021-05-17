import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onConfirmCardDelete,
}) {
  const currentUserContext = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-container" onClick={onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUserContext.avatar})` }}
          ></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUserContext.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{currentUserContext.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="элементы">
        <ul className="elements__list">
          {cards.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onConfirmCardDelete={onConfirmCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

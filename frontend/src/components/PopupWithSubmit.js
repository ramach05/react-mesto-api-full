import { useState } from "react";
import Popup from "./Popup";

function PopupWithSubmit({ onCardDelete, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(true);

  function handleDeleteClick(e) {
    e.preventDefault();
    setIsLoading(true);
    onCardDelete(e, setIsLoading, setIsButtonValid);
    setIsButtonValid(false);
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="popup__container" onSubmit={handleDeleteClick}>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h3 className="popup__title">Вы уверены?</h3>
        <button
          type="submit"
          className={
            isButtonValid ? "buttonSubmit" : "buttonSubmit buttonSubmit_disable"
          }
          disabled={!isButtonValid}
        >
          {isLoading ? "Удаление..." : "Да"}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithSubmit;

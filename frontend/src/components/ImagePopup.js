function ImagePopup({ isOpen, onClose, targetCard }) {
  return (
    <div
      className={`${isOpen ? "popup popup_visible" : "popup"}`}
      id="popup-photo"
      onClick={onClose}
    >
      <div className="popup__container popup__container_photo">
        <button
          type="button"
          className="popup__close-button popup__close-button_photo"
          onClick={onClose}
        />
        <img
          src={`${targetCard.link}`}
          alt={targetCard.name}
          className="popup__photo-photo"
        />
        <p className="popup__photo-title">{targetCard.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;

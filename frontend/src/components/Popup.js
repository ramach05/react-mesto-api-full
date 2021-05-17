function Popup({ isOpen, onClose, children }) {
  return (
    <div
      className={`${isOpen ? "popup popup_visible" : "popup"}`}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export default Popup;

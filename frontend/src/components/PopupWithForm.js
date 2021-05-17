import Popup from "./Popup";

function PopupWithForm({
  children,
  isOpen,
  name,
  onClose,
  onSubmit,
  formRef,
  title,
  isButtonValid,
  isLoading,
  buttonTextLoading,
  buttonText,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form
        className={`popup__container popup__container_${name}`}
        id={`form-${name}`}
        noValidate
        onSubmit={onSubmit}
        ref={formRef}
      >
        <button
          type="button"
          className={`popup__close-button popup__close-button_${name}`}
          onClick={onClose}
        />
        <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
        {children}
        <button
          type="submit"
          className={
            isButtonValid ? "buttonSubmit" : "buttonSubmit buttonSubmit_disable"
          }
          disabled={!isButtonValid}
        >
          {isLoading ? buttonTextLoading : buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;

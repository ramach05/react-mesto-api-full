import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const inputRef = useRef();
  const formRef = useRef();
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onUpdateAvatar(e, setIsLoading, {
      url: inputRef.current.value,
    });

    setIsButtonValid(false);
    formRef.current.reset();
  }

  function handleChange() {
    if (formRef.current.checkValidity()) {
      setIsButtonValid(true);
      setIsInputError(false);
    } else {
      setIsButtonValid(false);
      setIsInputError(true);
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="update-avatar"
      title="Обновить аватар"
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      formRef={formRef}
      isButtonValid={isButtonValid}
      isLoading={isLoading}
      buttonTextLoading="Сохранение..."
    >
      <input
        type="url"
        className={
          isInputError ? "popup__input popup__input_invalid" : "popup__input"
        }
        placeholder="Ссылка на картинку"
        required
        id="form-avatar-input-url"
        name="formAvatarInputUrl"
        ref={inputRef}
        onChange={handleChange}
      />
      <span className="error" id="form-avatar-input-url-error">
        {isInputError && `${inputRef.current.validationMessage}`}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

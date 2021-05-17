import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const inputTitleRef = useRef();
  const inputUrlRef = useRef();
  const formRef = useRef();
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [isInputTitleError, setIsInputTitleError] = useState(false);
  const [isInputUrlError, setIsInputUrlError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onAddPlace(e, setIsLoading, {
      name: inputTitleRef.current.value,
      link: inputUrlRef.current.value,
    });

    setIsButtonValid(false);
    formRef.current.reset();
  }

  function handleChange(e) {
    formRef.current.checkValidity()
      ? setIsButtonValid(true)
      : setIsButtonValid(false);

    if (e.target === inputTitleRef.current) {
      inputTitleRef.current.validity.valid
        ? setIsInputTitleError(false)
        : setIsInputTitleError(true) && setIsButtonValid(false);
    } else if (e.target === inputUrlRef.current) {
      inputUrlRef.current.validity.valid
        ? setIsInputUrlError(false)
        : setIsInputUrlError(true) && setIsButtonValid(false);
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="add"
      title="Новое место"
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
      formRef={formRef}
      isButtonValid={isButtonValid}
      isLoading={isLoading}
      buttonTextLoading="Создание..."
    >
      <input
        type="text"
        className={
          isInputTitleError
            ? "popup__input popup__input_invalid"
            : "popup__input"
        }
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        id="form-add-input-title"
        name="formAddInputTitle"
        ref={inputTitleRef}
        onChange={handleChange}
      />
      <span className="error" id="form-avatar-input-url-error">
        {isInputTitleError && `${inputTitleRef.current.validationMessage}`}
      </span>
      <input
        type="url"
        className={
          isInputUrlError ? "popup__input popup__input_invalid" : "popup__input"
        }
        placeholder="Ссылка на картинку"
        required
        id="form-add-input-url"
        name="formAddInputUrl"
        ref={inputUrlRef}
        onChange={handleChange}
      />
      <span className="error" id="form-avatar-input-url-error">
        {isInputUrlError && `${inputUrlRef.current.validationMessage}`}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

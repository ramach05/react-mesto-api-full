import { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/utils";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUserContext = useContext(CurrentUserContext);

  const inputNameRef = useRef();
  const inputSubtitleRef = useRef();
  const formRef = useRef();

  const [isButtonValid, setIsButtonValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({ name: false, description: false });
  const [state, setState] = useState({
    name: currentUserContext.name,
    description: currentUserContext.about,
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((myData) => {
        setState({
          name: myData.name,
          description: myData.about,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOpen]);

  function handleSubmitPopup(e) {
    e.preventDefault();
    setIsLoading(true);

    onUpdateUser(e, setIsLoading, {
      name: state.name,
      about: state.description,
    });

    setIsButtonValid(false);
  }

  function handleChange(e) {
    const { name, value, validity } = e.target;

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: !validity.valid,
    }));
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    formRef.current.checkValidity()
      ? setIsButtonValid(true)
      : setIsButtonValid(false);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmitPopup}
      formRef={formRef}
      isButtonValid={isButtonValid}
      isLoading={isLoading}
      buttonTextLoading="Сохранение..."
    >
      <input
        type="text"
        className={
          error.name
            ? "popup__input popup__input_invalid 424242"
            : "popup__input"
        }
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        name="name"
        value={state.name}
        ref={inputNameRef}
        onChange={handleChange}
      />
      <span className="error" id="form-avatar-input-url-error">
        {error.name && `${inputNameRef.current.validationMessage}`}
      </span>
      <input
        type="text"
        className={
          error.description
            ? "popup__input popup__input_invalid"
            : "popup__input"
        }
        placeholder="О себе"
        required
        minLength={2}
        maxLength={200}
        name="description"
        value={state.description}
        ref={inputSubtitleRef}
        onChange={handleChange}
      />
      <span className="error" id="form-avatar-input-url-error">
        {error.description && `${inputSubtitleRef.current.validationMessage}`}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

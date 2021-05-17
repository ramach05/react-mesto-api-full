import { useRef } from "react";
import { Link } from "react-router-dom";
import * as auth from "../auth";

function Register({
  setIsSingInPage,
  setIsInfoTooltipPopupOpen,
  setIsRegisted,
  setIsGetLogged,
}) {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const formRef = useRef();

  function handleSubmitRegister(e) {
    e.preventDefault();
    setIsGetLogged(false);

    auth
      .register({
        password: inputPasswordRef.current.value,
        email: inputEmailRef.current.value,
      })
      .then(() => {
        setIsRegisted(true);
        setIsGetLogged(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsRegisted(false);
        setIsInfoTooltipPopupOpen(true);
        setIsGetLogged(true);
        console.log(err);
      });
  }

  function handleClick() {
    setIsSingInPage(true);
  }

  return (
    <form className="auth" ref={formRef} onSubmit={handleSubmitRegister}>
      <h3 className="auth__title">Регистрация</h3>
      <input
        type="email"
        className="auth__input"
        placeholder="Email"
        required
        ref={inputEmailRef}
      />
      <input
        type="password"
        autoComplete="off"
        className="auth__input"
        placeholder="Пароль"
        required
        minLength={4}
        ref={inputPasswordRef}
      />
      <button type="submit" className="auth__buttonSubmit">
        Зарегистрироваться
      </button>
      <p className="auth__text" href="">
        Уже зарегистрированы? &ensp;
        <Link to="/signin" className="auth__link" onClick={handleClick}>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;

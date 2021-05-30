import { useRef } from "react";
import { useHistory } from "react-router";
import * as auth from "../auth";

function Login({
  setIsGetLogged,
  setIsLoggedIn,
  setIsInfoTooltipPopupOpen,
  setIsRegisted,
}) {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const formRef = useRef();
  const history = useHistory();

  function handleSubmitLogin(e) {
    e.preventDefault();
    setIsGetLogged(false);
    setIsLoggedIn(false);

    auth
      .authorize({
        password: inputPasswordRef.current.value,
        email: inputEmailRef.current.value,
      })
      .then(() => {
        history.push("/");
        setIsLoggedIn(true);
        setIsGetLogged(true);
      })
      .catch((err) => {
        setIsRegisted(false);
        setIsGetLogged(true);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  return (
    <form className="auth" ref={formRef} onSubmit={handleSubmitLogin}>
      <h3 className="auth__title">Вход</h3>
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
        minLength={8}
        ref={inputPasswordRef}
      />
      <button type="submit" className="auth__buttonSubmit">
        Войти
      </button>
    </form>
  );
}

export default Login;

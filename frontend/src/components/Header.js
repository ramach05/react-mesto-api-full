import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { IsLoggedInContext } from "../contexts/CurrentUserContext";
import MestoRussia from "../images/svg/MestoRussia.svg";

function Header({ setIsLoggedIn, setIsSingInPage, isSingInPage, email }) {
  const isLoggedInContext = useContext(IsLoggedInContext);
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/login");
  }

  function handleClick() {
    setIsSingInPage(!isSingInPage);
  }

  return (
    <header aria-label="шапка" className="header">
      <img
        src={MestoRussia}
        alt="лого сайта Mesto Russia."
        className="header__logo"
      />
      {isLoggedInContext ? (
        <>
          <h3 className="header__email">{email}</h3>
          <Link to="/signin" className="header__text" onClick={signOut}>
            Выйти
          </Link>
        </>
      ) : isSingInPage ? (
        <Link to="/signup" className="header__text" onClick={handleClick}>
          Регистрация
        </Link>
      ) : (
        <Link to="/signin" className="header__text" onClick={handleClick}>
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;

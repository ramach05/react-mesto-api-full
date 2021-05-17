import authTrueImage from "../images/svg/auth-true.svg";
import authFalseImage from "../images/svg/auth-false.svg";
import { useHistory } from "react-router";
import Popup from "./Popup";

function PopupInfoTooltip({ onClose, isRegisted, setIsSingInPage, isOpen }) {
  const history = useHistory();

  const IconStyle = {
    backgroundImage: `url(${isRegisted ? authTrueImage : authFalseImage})`,
    width: "120px",
    height: "120px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    margin: "60px auto 32px",
  };

  function handleClose(e) {
    onClose(e);
    if (isRegisted) {
      history.push("/signin");
      setIsSingInPage(true);
    }
  }

  if (isOpen) {
    window.addEventListener("keydown", handleClose);
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={handleClose}
        />
        <div style={IconStyle}></div>
        <p className="popup__info-tooltip-text">
          {isRegisted
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
}

export default PopupInfoTooltip;

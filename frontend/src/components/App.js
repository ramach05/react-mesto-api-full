import { useEffect, useState } from "react";
import { api } from "../utils/utils";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {
  CurrentUserContext,
  IsLoggedInContext,
} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithSubmit from "./PopupWithSubmit";
import Spinner from "./Spinner";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import PopupInfoTooltip from "./PopupInfoTooltip";
import { Redirect, Route, Switch } from "react-router";
import * as auth from "../auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(
    false
  );

  const [isGetUserInfo, setIsGetUserInfo] = useState(false);
  const [isGetInitialCards, setIsGetInitialCards] = useState(false);
  const [isGetLogged, setIsGetLogged] = useState(true);

  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "...",
    about: "...",
    avatar: "https://",
  });
  const [cards, setCards] = useState([]);
  const [targetCardDelete, setTargetCardDelete] = useState("");

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isRegisted, setIsRegisted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSingInPage, setIsSingInPage] = useState(true);

  useEffect(() => {
    api
      .getUserInfo()
      .then((myData) => {
        setCurrentUser({
          name: myData.name,
          about: myData.about,
          avatar: myData.avatar,
          id: myData._id,
        });

        setIsGetUserInfo(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsGetUserInfo(true);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsFromApi) => {
        const renderCards = cardsFromApi.map((item) => {
          return {
            _id: item._id,
            link: item.link,
            name: item.name,
            likes: item.likes,
            owner: item.owner,
          };
        });

        setCards([...renderCards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsGetInitialCards(true);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (localStorage.getItem("token")) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res._id === currentUser.id) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          console.log(err);
        });
    }
  }, [isLoggedIn, currentUser]);

  function handleCardClick(card) {
    setSelectedCard(card);
    window.addEventListener("keydown", closeAllPopups);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    window.addEventListener("keydown", closeAllPopups);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    window.addEventListener("keydown", closeAllPopups);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    window.addEventListener("keydown", closeAllPopups);
  }
  function handleConfirmCardDelete(targetCardId) {
    setTargetCardDelete(targetCardId);
    setIsConfirmDeletePopupOpen(true);
    window.addEventListener("keydown", closeAllPopups);
  }

  function closeAllPopups(e, isFormSubmit) {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close-button") ||
      isFormSubmit ||
      e.key === "Escape"
    ) {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsConfirmDeletePopupOpen(false);
      setSelectedCard("");
      window.removeEventListener("keydown", closeAllPopups);
      setIsInfoTooltipPopupOpen(false);
    }
  }

  function handleUpdateAvatar(e, setIsLoading, { url }) {
    api
      .setUserAvatar({ url })
      .then((res) => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar: res.avatar,
          id: currentUser.id,
        });

        closeAllPopups(e, { isFormSubmit: true });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(e, setIsLoading, { name, about }) {
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: currentUser.avatar,
          id: currentUser.id,
        });

        closeAllPopups(e, { isFormSubmit: true });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(e, setIsLoading, { name, link }) {
    api
      .addOneCard({
        name,
        link,
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups(e, { isFormSubmit: true });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(e, setIsLoading, setIsButtonValid) {
    api
      .deleteOneCard(targetCardDelete)
      .then(() => {
        setCards((state) => state.filter((c) => targetCardDelete !== c._id));

        closeAllPopups(e, { isFormSubmit: true });
        setIsLoading(false);
        setIsButtonValid(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setTargetCardDelete("");
  }

  function handleCardLike(card, isLiked) {
    if (isLiked) {
      api
        .deleteLikeTargetCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeTargetCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <div className="body">
          <Spinner
            isOpen={
              isGetUserInfo && isGetInitialCards && isGetLogged ? false : true
            }
          />

          <div className="page">
            <Header
              email={email}
              setIsLoggedIn={setIsLoggedIn}
              isSingInPage={isSingInPage}
              setIsSingInPage={setIsSingInPage}
            />

            <Switch>
              <Route
                path="/signin"
                render={() => (
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    setIsGetLogged={setIsGetLogged}
                    setIsRegisted={setIsRegisted}
                    setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                  />
                )}
              />
              <Route
                path="/signup"
                render={() => (
                  <Register
                    setIsSingInPage={setIsSingInPage}
                    setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                    setIsRegisted={setIsRegisted}
                    setIsGetLogged={setIsGetLogged}
                  />
                )}
              />

              <ProtectedRoute
                exact
                path="/"
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardLike={handleCardLike}
                onConfirmCardDelete={handleConfirmCardDelete}
                cards={cards}
                component={Main}
              />
            </Switch>

            <Route path="*">
              {isLoggedIn ? (
                <>
                  <Redirect to="/" />
                  <Footer />
                </>
              ) : (
                <Redirect to="/signin" />
              )}
            </Route>
          </div>

          <PopupInfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isRegisted={isRegisted}
            onClose={closeAllPopups}
            setIsSingInPage={setIsSingInPage}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            isOpen={selectedCard}
            targetCard={selectedCard}
            onClose={closeAllPopups}
          />
          <PopupWithSubmit
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

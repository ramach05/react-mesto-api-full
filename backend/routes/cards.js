const cardsRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
	getCards,
	createCard,
	deleteCard,
	likeCard,
	dislikeCard,
} = require("../controllers/cards");

//запросы
cardsRouter.get("/cards", getCards);

cardsRouter.post("/cards",
	celebrate({
		body: Joi.object().keys({
			link: Joi.string().required().regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
			name: Joi.string().required().min(2).max(30),
		}),
	}),
	createCard);

cardsRouter.delete("/cards/:cardId",
	celebrate({
		params: Joi.object().keys({
			cardId: Joi.string().length(24).hex(),
		}),
	}),
	deleteCard);

cardsRouter.put("/cards/:cardId/likes",
	celebrate({
		params: Joi.object().keys({
			cardId: Joi.string().length(24).hex(),
		}),
	}),
	likeCard);

cardsRouter.delete("/cards/:cardId/likes",
	celebrate({
		params: Joi.object().keys({
			cardId: Joi.string().length(24).hex(),
		}),
	}),
	dislikeCard);

exports.cardsRouter = cardsRouter;

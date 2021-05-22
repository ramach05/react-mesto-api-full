const BadRequest = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const Cards = require("../models/card");

exports.getCards = (req, res, next) => {
	Cards.find({})
		.then((cards) => res.status(200).send({ cards }))
		.catch(next);
};

exports.createCard = (req, res, next) => {
	const { name, link } = req.body;
	const owner = req.user._id;

	Cards.create(
		{ name, link, owner },
	)
		.then((card) => {
			if (!card) {
				throw new BadRequest();
			}
			Cards.find({}).populate(["owner", "likes"]);
			return res.status(200).send({ card });
		})
		.catch((err) => {
			if (err.name === "ValidationError") {
				throw new BadRequest(err.message);
			}
			return next(err);
		})
		.catch(next);
};

exports.deleteCard = (req, res, next) => {
	Cards.findByIdAndRemove(req.params.cardId)
		.orFail(() => new NotFoundError("Карточка с указанным _id не найдена")) //если приходит пустой объект, назначает ошибку и переходит в catch
		.then((card) => {
			if (req.user._id === card.owner.toString()) {
				return res.status(200).send({ card });
			}
			throw new BadRequest("Нельзя удалять карточки других пользователей");
		})
		.catch(next);
};

exports.likeCard = (req, res, next) => {
	Cards.findByIdAndUpdate(
		req.params.cardId,
		{ $addToSet: { likes: req.user._id } }, //добавить _id в массив, если его там нет
		{ new: true }, //обработчик then получит на вход обновлённую запись
	)
		.orFail(new NotFoundError("Переданы некорректные данные для постановки/снятия лайка")) //если приходит пустой объект, назначает ошибку и переходит в catch
		.then((card) => res.status(200).send({ card }))
		.catch((err) => {
			if (err.name === "CastError") {
				return next(new BadRequest("Переданы некорректные данные для постановки/снятия лайка"));
			}
			return next(err);
		});
};

exports.dislikeCard = (req, res, next) => {
	Cards.findByIdAndUpdate(
		req.params.cardId,
		{ $pull: { likes: req.user._id } }, //убрать _id из массива
		{ new: true }, //обработчик then получит на вход обновлённую запись
	)
		.orFail(new NotFoundError("Переданы некорректные данные для постановки/снятия лайка")) //если приходит пустой объект, назначает ошибку и переходит в catch
		.then((card) => res.status(200).send({ card }))
		.catch((err) => {
			if (err.name === "CastError") {
				throw new BadRequest("Переданы некорректные данные для постановки/снятия лайка");
			}
			return next(err);
		})
		.catch(next);
};

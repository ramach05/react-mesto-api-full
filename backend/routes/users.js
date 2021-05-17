const usersRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
	getUsers,
	getUserById,
	updateUserProfile,
	updateUserAvatar,
	getMe,
} = require("../controllers/users");

//запросы
usersRouter.get("/users", getUsers);

usersRouter.get("/users/me", getMe);

usersRouter.get("/users/:userId", getUserById);

usersRouter.patch("/users/me",
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().min(2).max(30).required(),
			about: Joi.string().min(2).max(30).required(),
		}),
	}),
	updateUserProfile);

usersRouter.patch("/users/me/avatar",
	celebrate({
		body: Joi.object().keys({
			avatar: Joi.string().required().regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
		}),
	}),
	updateUserAvatar);

exports.usersRouter = usersRouter;

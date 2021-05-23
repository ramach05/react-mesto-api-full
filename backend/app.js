const express = require("express");
const mongoose = require("mongoose");

const app = express();
const {
	PORT = 3001,
	MONGO_URL = "mongodb://localhost:27017/mestodb",
} = process.env;
const { celebrate, Joi } = require("celebrate"); //для валидации запросов
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const { usersRouter } = require("./routes/users");
const { cardsRouter } = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const { auth } = require("./middlewares/auth");
const NotFoundError = require("./errors/not-found-err");
const Users = require("./models/user");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { handleErrors } = require("./errors/handleErrors");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 500, //limit each IP to 500 requests per windowMs
});

//подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

app.use(helmet()); //помогает защитить приложение от некоторых широко известных веб-уязвимостей путем соответствующей настройки заголовков HTTP
app.use(express.json()); //добавляется в запрос поле req.body
app.use(cors()); //защита роутов
app.use(requestLogger); //логгер запросов
app.use(limiter); //защита от DoS-атак

app.use((req, res, next) => { //вывод в консоль методда и пути
	console.log(req.method, req.path);
	next();
});

app.get("/crash-test", () => { //краш-тест сервера. pm2 должен восстанавливать сервер после данного запроса
	setTimeout(() => {
		throw new Error("Сервер сейчас упадёт"); //необработанная ошибка вызывает событие uncaughtException
	}, 0);
});

app.post("/signin",
	celebrate({
		body: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required().min(8),
		}),
	}),
	login);
app.post("/signup",
	celebrate({
		body: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required().min(8),
			name: Joi.string().min(2).max(30)
				.default("Жак-Ив Кусто"),
			about: Joi.string().min(2).max(30)
				.default("Исследователь"),
			avatar: Joi.string().default("https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png").regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
		}),
	}),
	createUser);

app.use(auth, usersRouter);
app.use(auth, cardsRouter);
app.use("*", (req, res, next) => Users.findOne({})
	.then(() => {
		throw new NotFoundError("Ресурс не найден");
	})
	.catch(next)); //эквивалентно catch(err => next(err))

app.use(errorLogger); //логгер ошибок

app.use(handleErrors); //централизованная обработка ошибок

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`); //если всё работает, консоль покажет, какой порт приложение слушает
});

module.exports = PORT;

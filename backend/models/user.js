const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			//у пользователя есть имя — опишем требования к имени в схеме:
			type: String, //имя — это строка
			minlength: 2, //минимальная длина имени — 2 символа
			maxlength: 30, //а максимальная — 30 символов
			default: "Жак-Ив Кусто",
		},
		about: {
			type: String,
			minlength: 2,
			maxlength: 30,
			default: "Исследователь",
		},
		avatar: {
			type: String,
			default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
			match: [/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/, "Введите правильную ссылку"],
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false, //чтобы хеш пароля не возвращался (работает только в методах find)
		},
	},

	{ versionKey: false }, //для отключения поля '__v'
);

module.exports = mongoose.model("user", userSchema); //в компасе к названию коллекции добавляется s

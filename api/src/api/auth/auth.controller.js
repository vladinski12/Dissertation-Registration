import * as AuthService from "./auth.service.js";

async function login(req, res, next) {
	try {
		res.status(200).json(await AuthService.login(req.body));
	} catch (err) {
		next(err);
	}
}

async function register(req, res, next) {
	try {
		res.status(200).json(await AuthService.register(req.body));
	} catch (err) {
		next(err);
	}
}

export { login, register };

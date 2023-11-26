import * as RegistrationSessionsService from "../registration-session/registration-session.service.js";

export async function createRegistrationSession(req, res, next) {
	try {
		const professorId = req.user.id;
		res
			.status(200)
			.json(
				await RegistrationSessionsService.createRegistrationSession(
					professorId,
				),
			);
	} catch (err) {
		next(err);
	}
}

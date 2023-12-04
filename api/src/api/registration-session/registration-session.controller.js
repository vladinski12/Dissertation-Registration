import * as RegistrationSessionsService from '../registration-session/registration-session.service.js';

export async function createRegistrationSession(req, res, next) {
	try {
		const professorId = req.user.id;
		const { startDate, endDate } = req.body;
		res
			.status(200)
			.json(
				await RegistrationSessionsService.createRegistrationSession(
					professorId,
					startDate,
					endDate,
				),
			);
	} catch (err) {
		next(err);
	}
}

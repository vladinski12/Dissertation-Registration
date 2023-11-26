import * as ProfessorService from "./professor.service.js";

export async function getAllAvailableProfessors(req, res, next) {
	try {
		res
			.status(200)
			.json(await ProfessorService.getAllAvailableProfessors(req.body));
	} catch (err) {
		next(err);
	}
}

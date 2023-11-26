import { isValidString } from "../../../utils/validators.js";

export default function CreateDissertationRequestValidate(req, res, next) {
	const { professorId } = req.body;
	if (!professorId) {
		return res.status(400).json({ message: "Professor id is required" });
	}
	if (!isValidString(professorId, 5, 255)) {
		return res.status(400).json({ message: "Invalid professor id" });
	}
	next();
}

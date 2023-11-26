import { isValidString, isValidDate } from '../../../utils/validators.js';

export default function CreateDissertationRequestValidate(req, res, next) {
	const { startDate, endDate } = req.body;

	if (!startDate || !endDate) {
		return res
			.status(400)
			.json({ message: 'Start date and end date are required' });
	}

	if (!isValidString(startDate, 5, 255) || !isValidString(endDate, 5, 255)) {
		return res.status(400).json({ message: 'Invalid dates' });
	}

	if (!isValidDate(startDate) || !isValidDate(endDate)) {
		return res.status(400).json({ message: 'Invalid dates' });
	}
	next();
}

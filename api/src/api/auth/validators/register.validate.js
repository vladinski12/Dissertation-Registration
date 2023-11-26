import {
	isValidString,
	isValidEmail,
	isValidUserRole,
} from '../../../utils/validators.js';

export default function RegisterValidate(req, res, next) {
	const { email, name, password, userRole } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' });
	}
	if (
		!isValidString(email, 5, 255) ||
		!isValidString(name, 2, 255) ||
		!isValidString(password, 8, 255) ||
		!isValidString(userRole, 2, 255) ||
		!isValidEmail(email) ||
		!isValidUserRole(userRole)
	) {
		return res
			.status(400)
			.json({ message: 'Invalid email, name, password or user role' });
	}
	next();
}

import { isValidString, isValidEmail } from '../../../utils/validators.js';

export default function LoginValidate(req, res, next) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' });
	}
	if (
		!isValidString(email, 5, 255) &&
		!isValidString(password, 8, 255) &&
		!isValidEmail(email)
	) {
		return res.status(400).json({ message: 'Invalid email or password' });
	}
	next();
}

const ErrorMiddleware = (error, req, res, next) => {
	try {
		const message = error.message || 'Internal Server Error';
		const status = error.status || 500;
		console.error(
			`[${req.method}] ${req.path} status:: ${status} message:: ${message}`,
			'error',
		);

		res.status(status).json({ message });
	} catch (error) {
		next(error);
	}
};

export default ErrorMiddleware;

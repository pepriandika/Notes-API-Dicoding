const ClientError = require("../../exceptions/ClientError");

class AuthenticatiosHandler {
	constructor(authenticationsService, usersService, tokenManager, validator) {
		this._authenticationsService = authenticationsService;
		this._usersService = usersService;
		this._tokenManager = tokenManager;
		this._validator = validator;
	}

	async postAuthenticationHandler(request, h) {
		try {
			this._validator.validatePostAuthenticationsPayload(request.payload);

			const { username, password } = request.payload;
			const id  = await this._usersService.verifyUserCredential(username, password);

			const accessToken = this._tokenManager.generateAccessToken({ id });
			const refreshToken = this._tokenManager.generateRefreshToken({ id });
		} catch (e) {
			if (e instanceof ClientError) {
				const response = h.response({
					status: "fail",
					message: e.message,
				});
				response.code(e.statusCode);
				return response;
			}

			// Server Error!
			const response = h.response({
				stauts: "error",
				message: "Maaf, terjadi kegagalan pada sistem kami.",
			});
			response.code(500);
			console.error(e);
			return response;
		}
	}
}

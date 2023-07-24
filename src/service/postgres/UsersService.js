const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const { nanoid } = require("nanoid");

class UsersService {
	constructor() {
		this._pool = new Pool();
	}

	async addUser({
		username,
		password,
		fullName
	}) {
		await this.verifyNewUsername(username);
		const id = nanoid(16);

		// TODO: Bila verifikasi lolos, maka masukkan user baru ke database.
	}

	async verifyNewUsername(username) {
		const query = {
			query: "SELECT username FROM users WHERE username = $1",
			value: [username],
		};
		const result = await this._pool.query(query);

		if (result.rows.length > 0) {
			throw new InvariantError("Gagal menambahkan user. Username sudah digunakan");
		}
	}
}

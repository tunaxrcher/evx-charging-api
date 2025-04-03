const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class UserToken {
    constructor(userId, token, expiryDate) {
        this._userId = userId;
        this._token = token;
        this._expiryDate = expiryDate;
    }
    async save() {
        try {
            const sql = `
                INSERT INTO user_tokens (user_id, token, expiryDate) 
                VALUES ('${this._userId}', '${this._token}', '${this._expiryDate}')
            `;
            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }

    static async find() {
        const sql = 'SELECT * FROM user_tokens';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findByToken(token) {
        const sql = `SELECT * FROM user_tokens WHERE token = '${token}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }


    static async findByIdAndDelete(id) {
        const sql = `DELETE FROM user_tokens WHERE id = ${id}`;
        console.log(sql)
        await pool.execute(sql);
    }
}

module.exports = UserToken;

const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class User {
    constructor(email, password) {
        this._email = email;
        this._password = password;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        if (password < 0) throw new Error('Invalid password value.');
        this.password = password;
    }

    async save() {
        try {
            const sql = `
                INSERT INTO users (email, password, username) 
                VALUES ('${this.email}', '${this.password}', '${this.email}')
            `;
            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }

    static async find() {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM users WHERE id = '${id}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByPhone(phone) {
        const sql = `SELECT * FROM users WHERE phone = '${phone}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `UPDATE users SET fullname = '${options.fullname}' WHERE id = ${id}`;
        const [response] = await pool.execute(sql);
        return response.affectedRows;
    }

    static async findByIdAndDelete(id) {
        const sql = `DELETE FROM users WHERE id = "${id}"`;
        await pool.execute(sql);
    }
}

module.exports = User;

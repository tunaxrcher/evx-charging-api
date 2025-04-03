const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class Withdraw {
    constructor() {}

    static async find() {
        const sql = 'SELECT * FROM withdraws';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM withdraws WHERE id = '${id}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `
            UPDATE withdraws 
            SET status = '${options.status}' 
            WHERE id = ${id}
        `;
        const [response] = await pool.execute(sql);
        return response.affectedRows;
    }
}

module.exports = Withdraw;

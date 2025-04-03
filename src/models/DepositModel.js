const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class Deposit {
    constructor() {}

    static async find() {
        const sql = 'SELECT * FROM deposits';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM deposits WHERE id = '${id}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `
            UPDATE deposits 
            SET status = '${options.status}' 
            WHERE id = ${id}
        `;
        const [response] = await pool.execute(sql);
        return response.affectedRows;
    }
}

module.exports = Deposit;

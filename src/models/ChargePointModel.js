const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class ChargePoint {
    constructor() {}

    static async find() {
        const sql = 'SELECT * FROM charge_points';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM charge_points WHERE id = '${id}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByStatus(status) {
        const sql = `SELECT * FROM charge_points WHERE status = '${status}'`;
        console.log(sql)
        const [rows] = await pool.execute(sql);
        return rows;
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `
            UPDATE charge_points 
            SET status = '${options.status}' 
            WHERE id = ${id}
        `;
        const [response] = await pool.execute(sql);
        return response.affectedRows;
    }
}

module.exports = ChargePoint;

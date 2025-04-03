const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class OwnerStation {
    constructor() {}

    static async find() {
        const sql = 'SELECT * FROM owner_stations';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM owner_stations WHERE id = '${id}'`;
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `
            UPDATE owner_stations 
            SET description = '${options.description}' 
            WHERE id = ${id}
        `;
        const [response] = await pool.execute(sql);
        return response.affectedRows;
    }
}

module.exports = OwnerStation;

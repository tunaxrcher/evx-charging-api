const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class Service {
    constructor() {}

    static async find() {
        const sql = 'SELECT * FROM history_services';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }
}

module.exports = Service;

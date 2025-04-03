const {pool} = require('../config/db');
// const { logger } = require('../utils/logger')

class Booking {
    constructor() {}

    static async find() {
        const sql = 'SELECT * FROM bookings';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }
}

module.exports = Booking;

const { log } = require('winston');
const { pool_steve, pool } = require('../config/db');

class MapData {
    constructor() {}

    static async getEvStationDetailMap() {
        const sql = `SELECT a.charge_box_id, a.charge_box_serial_number, a.registration_status,a.description, a.location_latitude, a.location_longitude, c.country, c.house_number, count(b.connector_id) as connectorCount
        FROM charge_box as a 
        LEFT JOIN connector as b 
        on a.charge_box_id = b.charge_box_id 
        LEFT JOIN address as c 
        on a.address_pk = c.address_pk
        where b.connector_id != 0 
        group by a.charge_box_id;`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows;
    }

}

module.exports = MapData;

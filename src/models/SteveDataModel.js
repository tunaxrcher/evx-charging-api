const { log } = require('winston');
const { pool_steve, pool } = require('../config/db');

class SteveData {
    constructor() {}

    static async findEVStationByName(charge_box_id) {
        const sql = `SELECT * FROM charge_box WHERE charge_box_id = '${charge_box_id}'`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async findEVStationConnecterByName(charge_box_id) {
        const sql = `SELECT * FROM connector WHERE charge_box_id = '${charge_box_id}' and connector_id != 0`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows;
    }

    static async findEVStationConnecterStatus(charge_box_id, connector_pk) {
        const sql = `SELECT * FROM connector
                    left join connector_status on 
                    connector.connector_pk = connector_status.connector_pk
                    left join charge_box on 
                    charge_box.charge_box_id = connector.charge_box_id
                    where  connector.charge_box_id = '${charge_box_id}' and connector_status.connector_pk = '${connector_pk}'
                    order by connector_status.status_timestamp DESC LIMIT 1;`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async findStartTrasectionLast(connector_pk, id_tag) {
        const sql = `SELECT * FROM transaction_start where connector_pk = '${connector_pk}' and id_tag = '${id_tag}' 
        order by transaction_pk DESC LIMIT 1;`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async insertTransection(options) {
        try {
            const sql = `
                INSERT INTO transactions (type, user_id, credit,transectionstate, cp_id, connecter_id, id_tag, transection_pk, connecter_pk) 
                VALUES ('${options.type}', '${options.user_id}', '${options.credit}', '${options.transectionstate}', '${options.cp_id}', '${options.connecter_id}', '${options.id_tag}', '${options.transection_pk}', '${options.connecter_pk}')`;

            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }

    static async getActiveChecgerData(options) {
        const sql = `SELECT * FROM connector_meter_value where transaction_pk = '${options.transaction_pk}' and (measurand = 'Energy.Active.Import.Register' or  measurand = 'Power.Active.Import')
        order by value_timestamp DESC LIMIT 2`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows;
    }

    static async getActiveTransections(options) {
        const sql = `SELECT * FROM transactions where user_id = '${options.user_id}' order by id DESC limit 1`;
        const [rows, fields] = await pool.execute(sql);
        return rows[0];
    }
    static async getTransectionsFinish(options) {
        const sql = `SELECT * FROM transactions where transection_pk = '${options.transection_pk}' order by id DESC`;
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async getConnectorFinish(options) {
        const sql = `SELECT * FROM connector_status where connector_pk = '${options.connector_pk}' order by status_timestamp DESC LIMIT 1`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async getActivePriceKw() {
        const sql = `SELECT * FROM price_kwh where status = 'ON' order by id DESC LIMIT 1;`;
        const [rows, fields] = await pool.execute(sql);
        return rows[0];
    }

    static async insertPriceKw(options) {
        try {
            const sql = `
                INSERT INTO price_kwh (price_Kw, monetary_unit,status) 
                VALUES ('${options.price_Kw}', '${options.monetary_unit}', 'ON')`;

            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }

    static async updatePriceKw(options) {
        try {
            const sql = `UPDATE price_kwh SET price_Kw = '${options.price_Kw}', monetary_unit = '${options.monetary_unit}', updated_at = now() WHERE id = ${options.id_price}`;
            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }

    static async summaryChargerUser(options) {
        try {
            const sql = `
                INSERT INTO summary_user_chager (user_id, sum_price, sum_Kw, credit, cp_id, connecter_id, id_tag, transection_pk, connecter_pk, country, sum_min) 
                VALUES ('${options.user_id}', '${options.sum_price}', '${options.sum_Kw}', '${options.credit}', '${options.cp_id}', '${options.connecter_id}', '${options.id_tag}', '${options.transection_pk}', '${options.connecter_pk}', '${options.country}', '${options.sum_min}')`;

            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }
}

module.exports = SteveData;

const mysql = require('mysql2/promise');
const config = require('config');

const DB_HOST = config.get('DB_HOST');
const DB_PORT = config.get('DB_PORT');
const DB_NAME = config.get('DB_NAME');
const DB_USERNAME = config.get('DB_USERNAME');
const DB_USERNAME_PASSWORD = config.get('DB_USERNAME_PASSWORD');

const DB_HOST_STEVE = config.get('DB_HOST_STEVE');
const DB_PORT_STEVE = config.get('DB_PORT_STEVE');
const DB_NAME_STEVE = config.get('DB_NAME_STEVE');
const DB_USERNAME_STEVE = config.get('DB_USERNAME_STEVE');
const DB_USERNAME_PASSWORD_STEVE = config.get('DB_USERNAME_PASSWORD_STEVE');

const connectionOptions = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_USERNAME_PASSWORD,
    timezone: 'Asia/Bangkok',
};

const connectionOptions_steve = {
    host: DB_HOST_STEVE,
    port: DB_PORT_STEVE,
    database: DB_NAME_STEVE,
    user: DB_USERNAME_STEVE,
    password: DB_USERNAME_PASSWORD_STEVE,
    timezone: 'Asia/Bangkok',
};

const pool = mysql.createPool(connectionOptions);
const pool_steve = mysql.createPool(connectionOptions_steve);

const connectToMySQL = async () => {
    try {
        await pool.getConnection();
        console.log('Database connected!');
    } catch (err) {
        console.log('Database connection error!');
        process.exit(1);
    }
};

const connectToMySQLSteve = async () => {
    try {
        await pool_steve.getConnection();
        console.log('Database Steve connected!');
    } catch (err) {
        console.log('Database Steve connection error!');
        process.exit(1);
    }
};

connectToMySQL().then();
connectToMySQLSteve().then();

module.exports = { pool, pool_steve };

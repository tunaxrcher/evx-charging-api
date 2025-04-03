require('dotenv/config');

const { logger } = require('./logger');

const { DB_HOST, DB_PORT, DB_USERNAME, DB_USERNAME_PASSWORD, DB_NAME, JWT_SECRET, JWT_SECRET_REFRESH_TOKEN } = process.env;

const requiredCredentials = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_USERNAME_PASSWORD', 'DB_NAME', 'JWT_SECRET'];

for (const credential of requiredCredentials) {
    if (process.env[credential] === undefined) {
        logger.error(`Missing required crendential: ${credential}`);
        process.exit(1);
    }
}

module.exports = {
    // DB
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_USERNAME_PASSWORD,
    DB_NAME,

    // JWT
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN
};

const dotenv = require('dotenv');

const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'development') dotenv.config();

const config = require('config');
const PORT = config.get('PORT');

const app = require('./app');
const { logger } = require('./utils/logger');
app.listen(PORT, () => logger.info(`Server is running in ${NODE_ENV} mode on port: ${PORT}`));

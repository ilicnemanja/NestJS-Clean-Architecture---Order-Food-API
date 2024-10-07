'use strict';

require('dotenv').config();

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info', // 'trace' is most useful to New Relic when diagnosing issues but may be overly verbose in production
  },
  // Additional configuration options...
};

import { configure, getLogger } from 'log4js';

configure({
  appenders: {
    console: { type: 'console', layout: { type: 'pattern', pattern: '%[%d{ISO8601_WITH_TZ_OFFSET} %p %c -%] %m' } },
    file: { type: 'file', filename: 'app.log' }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' }
  }
});

export const logger = getLogger();

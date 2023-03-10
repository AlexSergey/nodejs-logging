import pino from 'pino';
import { join } from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

const mixin = {
  appName: 'My app'
}

export const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  customLevels: levels,
  useOnlyCustomLevels: true,
  transport: isProduction ? {
    target: 'pino/file',
    options: { destination: join(__dirname, '..', 'app.log') },
  } : {
    target: 'pino-pretty',
    options: {
      colorize: true,
      destination: 2,
      sync: process.env.SENTRY_ENVIRONMENT === 'testing',
    },
  },
  formatters: {
    bindings: (bindings) => {
      return { pid: bindings.pid, host: bindings.hostname,
        node_version: process.version, };
    },
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  mixin() {
    return mixin;
  },
  // Remove sensitive data from logging
  redact: {
    paths: [
      'name',
      'address',
      'passport',
      'phone',
      'user.name',
      'user.address',
      'user.passport',
      'user.phone',
      '*.user.name',
      '*.user.address',
      '*.user.passport',
      '*.user.phone',
    ],
    censor: '[FORBIDDEN]',
    remove: isProduction,
  },
});

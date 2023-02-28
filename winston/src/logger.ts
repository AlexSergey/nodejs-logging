import { createLogger, format, transports } from 'winston';

const { combine, printf } = format;

const winstonFormat = printf(
  ({ level, message, timestamp, stack }) => {
    const ts = timestamp.slice(0, 19)
      .replace('T', ' ');
    return `${ts} [${level}]: ${stack || message}`;
  });

const { timestamp } = format;

export const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    process.env.NODE_ENV === 'development' ? format.colorize() : format.uncolorize(),
    timestamp(),
    winstonFormat,
  ),
  transports: [new transports.Console()],
});

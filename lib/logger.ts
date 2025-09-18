/**
 * Simple logger for development and production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...context
    };

    if (this.isDevelopment || level === 'error' || level === 'warn') {
      switch (level) {
        case 'error':
          console.error(message, context || '');
          break;
        case 'warn':
          console.warn(message, context || '');
          break;
        case 'info':
          console.info(message, context || '');
          break;
        case 'debug':
          console.debug(message, context || '');
          break;
      }
    }

    // In production, you might want to send to a logging service
    // if (process.env.LOGGING_SERVICE_URL && !this.isDevelopment) {
    //   fetch(process.env.LOGGING_SERVICE_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(logData)
    //   }).catch(() => {});
    // }
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }
}

export const logger = new Logger();
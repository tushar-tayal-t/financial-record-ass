import winston, {format} from 'winston';

export const logger = winston.createLogger({
  level: 'info',  
  format: winston.format.combine(
    winston.format.timestamp(),  
    winston.format.printf(     
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(), 
        format.timestamp(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    }),
    new winston.transports.File({ filename: 'logs/app.log' })  
  ]
});

export const errorLogger = winston.createLogger({
  level: 'error', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(), 
        format.timestamp(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    }),
    new winston.transports.File({ filename: 'logs/app.log' })  
  ]
});
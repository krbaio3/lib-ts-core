enum LogLevel {
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
}

class Logger {
	public static getInstance(level: LogLevel = LogLevel.INFO): Logger {
		Logger.instance ||= new Logger(level);
		return Logger.instance;
	}

	private static instance: Logger;

	public debug: (message: string, ...optionalParameters: any[]) => void;
	public info: (message: string, ...optionalParameters: any[]) => void;
	public warn: (message: string, ...optionalParameters: any[]) => void;
	public error: (message: string, ...optionalParameters: any[]) => void;

	private readonly level: LogLevel;
	private readonly isProduction: boolean;

	private constructor(level: LogLevel) {
		this.level = level;
		this.isProduction = process.env.NODE_ENV === 'production';

		// Bind methods to the instance
		this.debug = this.log.bind(this, LogLevel.DEBUG);
		this.info = this.log.bind(this, LogLevel.INFO);
		this.warn = this.log.bind(this, LogLevel.WARN);
		this.error = this.log.bind(this, LogLevel.ERROR);
	}



	private shouldLog(level: LogLevel): boolean {
		const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
		const currentLevelIndex = levels.indexOf(this.level);
		const messageLevelIndex = levels.indexOf(level);
		return messageLevelIndex >= currentLevelIndex;
	}

	private log(level: LogLevel, message: string, ...optionalParameters: any[]) {
		if (!this.isProduction && this.shouldLog(level)) {
			const { color, backgroundColor } = this.getStyles(level);
			const logFunction = level === LogLevel.ERROR ? console.error : console.log;

			const stackTrace = new Error('Error').stack?.split('\n').slice(2).join('\n');
			const enhancedMessage = `\nStack Trace:\n${stackTrace}`;

			logFunction(
				`%c[${level.toUpperCase()}]`,
				`color: ${color}; background: ${backgroundColor}; font-weight: bold;`,
				message,
				...optionalParameters,
				enhancedMessage,
			);
		}
	}

	private getStyles(level: LogLevel): { color: string; backgroundColor: string } {
		switch (level) {
			case LogLevel.DEBUG: {
				return { color: 'white', backgroundColor: 'blue' };
			}

			case LogLevel.INFO: {
				return { color: 'black', backgroundColor: 'green' };
			}

			case LogLevel.WARN: {
				return { color: 'black', backgroundColor: 'orange' };
			}

			case LogLevel.ERROR: {
				return { color: 'white', backgroundColor: 'red' };
			}

		}
	}
}

const logger = Logger.getInstance(LogLevel.DEBUG);
const { debug, info, warn, error } = logger;

export default logger;
export { LogLevel, debug, info, warn, error };

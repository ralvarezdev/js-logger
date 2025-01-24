import path from 'path';
import fs from 'fs';
import LogEntry, {LogEntryType} from "./log_entry.js";

// Errors that can be thrown by the Logger class
export const MISSING_LOG_PATH_ERROR = new Error('log output directory is required');
export const MISSING_LOG_FILENAME_ERROR = new Error('log filename is required');

// Logger  is a class that logs messages to the console and to a file.
export default class Logger {
    #save
    #logPath
    #logFilename
    #logFilePath
    #error
    #info
    #debug
    #warning
    #format

    // The constructor receives an object with the properties to configure the logger
    constructor({
                    save = false,
                    logPath = "",
                    logFilename = "",
                    error = true,
                    info = true,
                    debug = true,
                    warning = true,
                    format = {
                        locales: 'en-US',
                        options: {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false
                        }
                    }
                }) {
        // Set the properties of the logger
        this.#save = save;
        this.#logPath = logPath;
        this.#error = error;
        this.#info = info;
        this.#debug = debug;
        this.#warning = warning;
        this.#format = format;

        // Check if the save property is true
        if (save) {
            // Check if the logPath or logFilename property is empty
            if (logPath === "")
                throw MISSING_LOG_PATH_ERROR;
            if (logFilename === "")
                throw MISSING_LOG_FILENAME_ERROR;

            // Check if the logPath directory exists
            if (!fs.existsSync(this.#logPath))
                fs.mkdirSync(this.#logPath);

            // Check if the logFilename file exists
            this.#logFilename = logFilename
            this.#logFilePath = path.join(this.#logPath, logFilename);
            if (!fs.existsSync(this.#logFilename))
                fs.writeFileSync(this.#logFilename, "");
        }
    }

    // Append a log entry to the log file
    #appendLogEntryToFile(logEntry) {
        fs.appendFile(this.#logFilePath, logEntry, err => {
            if (err) throw err;
        });
    }

    // Write a log entry to the log file
    log({type = LogEntryType.INFO, message = ""}) {
        // Create a new LogEntry object
        const logEntry = new LogEntry({
            type,
            message,
            locales: this.#format.locales,
            options: this.#format.options,
        });

        // Format the log entry as a string
        const logEntryStr = String(logEntry);

        // Check if the save property is true
        if (this.#save)
            this.#appendLogEntryToFile(logEntryStr + "\n");

        console.log(logEntryStr);
    }

    // Write an error log entry to the log file
    error(message) {
        this.log({
            type: LogEntryType.ERROR,
            message,
        });
    }

    // Write an info log entry to the log file
    info(message) {
        this.log({
            type: LogEntryType.INFO,
            message
        });
    }

    // Write a warning log entry to the log file
    warning(message) {
        this.log({
            type: LogEntryType.WARNING,
            message
        });
    }

    // Write a debug log entry to the log file
    debug(message) {
        this.log({
            type: LogEntryType.DEBUG,
            message
        });
    }

    // Write a critical log entry to the log file
    critical(message) {
        this.log({
            type: LogEntryType.CRITICAL,
            message
        });
    }
}

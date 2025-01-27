// LogEntry is a class that represents a log entry
import GetFormattedDate from "./date.js";

// Log entry types
export const LogEntryType = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    WARNING: 'WARNING',
    CRITICAL: 'CRITICAL'
};

export default class LogEntry {
    #type;
    #message;
    #locales
    #options

    // Constructor of the class
    constructor({type = LogEntryType.INFO, message = "", locales, options}) {
        // Set the properties of the log entry
        this.#type = type;
        this.#message = message;
        this.#locales = locales;
        this.#options = options;
    }

    // String representation of the log entry
    toString() {
        return `${GetFormattedDate()} [${this.#type}] ${this.#message}`;
    }
}
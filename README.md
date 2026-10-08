# js-logger

Simple logger for Node.js projects. It prints timestamped, typed entries to the console and can optionally append them to a log file.

**Note:** This repository is archived and read-only.

Package `@ralvarezdev/js-logger` (0.1.13, ES modules). No dependencies beyond Node's `fs` and `path`.

## Installation

npm publication was not verified; installing from GitHub works regardless:

```bash
npm install github:ralvarezdev/js-logger
```

## Usage

```js
import Logger from "@ralvarezdev/js-logger";

const logger = new Logger({
  save: true,            // also append to a file (default false)
  logPath: "./logs",     // required when save is true
  logFilename: "app.log" // required when save is true
});

logger.info("Server started");
logger.warning("Low disk space");
logger.error("Something failed");
// <date> [INFO] Server started
```

## API

Exported from `index.js`: default `Logger`, `LogEntry`, `LogEntryType`, `GetFormattedDate`.

- **`new Logger({save, logPath, logFilename, error, info, debug, warning, format})`** — when `save` is `true`, `logPath` and `logFilename` are required (the constructor throws otherwise) and the directory is created if missing. `format` is `{locales, options}` for `Intl.DateTimeFormat` (default `en-US`, numeric date, 24-hour time).
- **Methods** — `log({type, message})`, `info`, `error`, `warning`, `debug`, `critical`.
- **`LogEntryType`** — `ERROR`, `INFO`, `DEBUG`, `WARNING`, `CRITICAL`.
- **Line format** — `<formatted date> [<TYPE>] <message>`.

Known quirks from reading the code: the `error`, `info`, `debug` and `warning` constructor flags are stored but the log methods do not filter on them, and the log file existence check uses the bare filename instead of the joined path.

## Project structure

```
index.js
logger/   logger.js, log_entry.js, date.js, index.js
```

There are no tests.

## License

The repository has a GNU General Public License v3.0 `LICENSE` file, but `package.json` declares `ISC`; the two disagree.

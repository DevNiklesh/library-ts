import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "../config/config";
import dayjs from "dayjs";
import os from "os";
import { LogOptions } from "../types/log-options.type";

const level: string = config.log.level || "info";

function formatParams(options: LogOptions) {
    const {
        level,
        id,
        jira,
        title,
        alert,
        filename,
        lineNumber,
        messageSummary,
    } = options;
    let contexts = options.context || "";
    let message = options.message || "";
    const stack = JSON.stringify(options.stack);

    if (message === "\t" || message === "\tundefined") {
        message = "";
    }

    const ts = dayjs().format(config.log.timestampPattern);

    if (contexts) {
        if (Array.isArray(contexts)) {
            if (contexts.length > 0) {
                contexts = `${contexts.join(", ")}`;
            }
        } else {
            contexts = `${contexts}`;
        }
    }
    if (alert) {
        let logFormat: string;
        const ts = dayjs().valueOf();
        logFormat = `${ts} ${level.toUpperCase()}`;
        if (id) {
            logFormat = `${logFormat} ${id}`;
        }
        if (jira) {
            logFormat = `${logFormat} ${jira}`;
        }
        logFormat = `${logFormat} ${config.log.alertProjectName}`;
        if (filename) {
            logFormat = `${logFormat} ${filename}`;
        }
        if (lineNumber) {
            logFormat = `${logFormat}:${lineNumber}`;
        }
        if (title) {
            logFormat = `${logFormat} ^${title}^`;
        }
        if (messageSummary) {
            logFormat = `${logFormat} ^${messageSummary}^`;
        }
        return logFormat;
    }
    const logFormat = `${ts} ${os.hostname()} ${config.log.projectName}[${
        process.pid
    }]: ${level.toUpperCase()} [${contexts}] ${JSON.stringify(message)}`;

    if (stack) {
        return `${logFormat} ${stack}`;
    }

    return logFormat;
}

const logFormat = format.combine(
    format.splat(),
    format.splat(),
    format.prettyPrint(),
    format.printf(formatParams)
);

const fileTransport = new DailyRotateFile({
    dirname: config.log.file.path,
    filename: `${config.log.file.name}${config.log.file.appender}`,
    datePattern: config.log.datePattern,
    zippedArchive: true,
});

const consoleTransport = new transports.Console();

const logger = createLogger({
    exitOnError: false,
    level,
    format: logFormat,
    transports: [fileTransport, consoleTransport],
});

export default logger;

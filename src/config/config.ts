import "dotenv/config";

export const config = {
    api: "api",
    version: "v1",
    port: (process.env.PORT || "3000") as string,
    database: {
        name: process.env.DATABASE_NAME as string,
        uri: process.env.DATABASE_URI as string,
    },
    log: {
        level: process.env.LOG_LEVEL,
        file: {
            path: process.env.LOG_PATH_DIR,
            name: process.env.LOG_FILE_NAME,
            appender: process.env.LOG_FILE_NAME_APPENDER,
        },
        datePattern: process.env.LOG_FILE_DATE_PATTERN as string,
        timestampPattern: process.env.LOG_TIMESTAMP_PATTERN,
        projectName: process.env.LOG_PROJECT_NAME,
        alertProjectName: process.env.ALERT_PROJECT_NAME,
    },
};

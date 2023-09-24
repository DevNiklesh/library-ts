import "dotenv/config";

export const config = {
    api: "api",
    version: "v1",
    port: (process.env.PORT || "3000") as string,
    database: {
        name: process.env.DATABASE_NAME as string,
        uri: process.env.DATABASE_URI as string,
    }
};
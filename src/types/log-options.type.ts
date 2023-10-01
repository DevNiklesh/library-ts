export interface LogOptions {
    level: string;
    id?: string;
    jira?: string;
    title?: string;
    alert?: boolean;
    filename?: string;
    lineNumber?: number;
    messageSummary?: string;
    context?: string[] | string;
    message?: string;
    stack?: unknown;
}

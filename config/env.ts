function requireEnv(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

const env = {
    DATABASE_URL: requireEnv("DATABASE_URL"),
    BETTER_AUTH_URL: requireEnv("BETTER_AUTH_URL"),
    BETTER_AUTH_SECRET: requireEnv("BETTER_AUTH_SECRET"),
    GITHUB_CLIENT_SECRET: requireEnv("GITHUB_CLIENT_SECRET"),
    GITHUB_CLIENT_ID: requireEnv("GITHUB_CLIENT_ID"),
    NODE_ENV: requireEnv("NODE_ENV"),
} as const;

export default env;
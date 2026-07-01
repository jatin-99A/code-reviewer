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
    APPLICATION_NAME: requireEnv("APPLICATION_NAME"),
    GITHUB_APP_ID: requireEnv("GITHUB_APP_ID"),
    GITHUB_APP_PRIVATE_KEY: requireEnv("GITHUB_APP_PRIVATE_KEY"),
    GITHUB_WEBHOOK_SECRET: requireEnv("GITHUB_WEBHOOK_SECRET"),
    NEXT_GITHUB_PUBLIC_LINK: requireEnv("NEXT_GITHUB_PUBLIC_LINK"),
    GITHUB_APP_NAME: requireEnv("GITHUB_APP_NAME"),
    REDIS_URL: requireEnv("REDIS_URL"),
    NEXT_PUBLIC_APP_URL: requireEnv("NEXT_PUBLIC_APP_URL"),
} as const;

export default env;
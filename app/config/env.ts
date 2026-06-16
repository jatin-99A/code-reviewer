function requireEnv(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

const env = {
    DATABASE_URL: requireEnv('DATABASE_URL'),
} as const;

export default env;
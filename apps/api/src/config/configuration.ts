export default () => ({
  CLIENT_ORIGIN_URL: process.env.CLIENT_ORIGIN_URL,
  PORT: parseInt(process.env.PORT, 10) || 8000,
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
    PORT: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
  AUTH0: {
    ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUDIENCE: process.env.AUTH0_AUDIENCE,
  },
});

const env = import.meta.env;

export default {
  API_URL: env.VITE_API_URL,
  AUTH0: {
    AUDIENCE: env.VITE_API_AUTH0_AUDIENCE,
    CLIENT_ID: env.VITE_AUTH0_CLIENT_ID,
    CALLBACK_URL: env.VITE_AUTH0_CALLBACK_URL,
    DOMAIN: env.VITE_AUTH0_DOMAIN,
  },
};

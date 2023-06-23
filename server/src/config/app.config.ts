import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DB_URL,
  },
  client: {
    localUrl: process.env.CLIENT_LOCAL_URL,
    productionUrl: process.env.CLIENT_PRODUCTION_URL,
  },
  server: {
    localUrl: process.env.SERVER_LOCAL_URL,
    productionUrl: process.env.SERVER_PRODUCTION_URL,
  },
  mail: {
    host: process.env.EM_HOST,
    port: parseInt(process.env.EM_PORT || '465', 10),
    user: process.env.EM_USER,
    password: process.env.EM_PASSWORD,
    senderName: process.env.EM_SENDER_NAME,
    senderEmail: process.env.EM_SENDER_EMAIL,
  },
  jwt: {
    secret: process.env.TOKEN_SECRET,
    duration: process.env.TOKEN_DURATION,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
}));

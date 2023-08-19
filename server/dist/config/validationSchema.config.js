"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigValidationSchema = void 0;
const Joi = require("@hapi/joi");
exports.appConfigValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    DB_URL: Joi.string().required(),
    CLIENT_LOCAL_URL: Joi.string().uri().default('http://localhost:3000'),
    CLIENT_PRODUCTION_URL: Joi.string().uri(),
    SEVER_LOCAL_URL: Joi.string().uri().default('http://localhost:3000'),
    SERVER_PRODUCTION_URL: Joi.string().uri(),
    EM_HOST: Joi.string().required(),
    EM_PORT: Joi.number().default(465),
    EM_USER: Joi.string().required(),
    EM_PASSWORD: Joi.string().required(),
    EM_SENDER_NAME: Joi.string().required(),
    EM_SENDER_EMAIL: Joi.string().email().required(),
    TOKEN_SECRET: Joi.string().required(),
    TOKEN_DURATION: Joi.string().default('1d'),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
});
//# sourceMappingURL=validationSchema.config.js.map
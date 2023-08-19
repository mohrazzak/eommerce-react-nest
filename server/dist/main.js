"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const chalk = require("chalk");
const timeout_interception_1 = require("./interception/timeout.interception");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        const logger = new common_1.Logger(bootstrap.name);
        app.use((0, helmet_1.default)());
        const config = new swagger_1.DocumentBuilder().setTitle('Saybers').setDescription('Saybers Ecommerce API').setVersion('0.1').build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        app.useGlobalInterceptors(new timeout_interception_1.TimeoutInterceptor());
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
        await app.listen(3000);
        if (process.env.NODE_ENV === 'production')
            common_1.Logger.log(`🚀  Server ready at ${chalk.hex('#87e8de').bold(process.env.SERVER_PRODUCTION_URL)}`, 'Bootstrap');
        else
            logger.log(`🚀  Server is listening on ${chalk.hex('#87e8de').bold(process.env.SERVER_LOCAL_URL)}`);
    }
    catch (error) {
        common_1.Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
        process.exit();
        throw new common_1.InternalServerErrorException(error);
    }
}
bootstrap().catch((e) => {
    throw e;
});
//# sourceMappingURL=main.js.map
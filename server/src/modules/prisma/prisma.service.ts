import { INestApplication, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { appConfig } from 'src/config';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger('DATABASE');

  constructor(
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {
    super({
      datasources: {
        db: {
          url: configService.database.url,
        },
      },
    });
    this.$connect()
      .then(() => {
        this.logger.log(`Connected to database`);
      })
      .catch((e) => {
        this.logger.error(`Error connecting to database: ${e.message}`);
        process.exit(1);
      });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  cleanDb() {
    return this.$transaction([]);
  }
}

import { Injectable, CacheOptionsFactory, CacheModuleOptions } from '@nestjs/common';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 60 * 1000,
      max: 100,
    };
  }
}

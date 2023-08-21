import { OmitType } from '@nestjs/swagger';
import { UserEntity } from './User.entity';

export class PublicUserEntity extends OmitType(UserEntity, ['password'] as const) {}

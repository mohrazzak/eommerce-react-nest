import { IsJWT } from 'class-validator';

export class ActivateDTO {
  @IsJWT()
  activateToken: string;
}

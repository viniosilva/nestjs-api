import { IsDateString, IsString } from 'class-validator';

export class CreateCatRequest {
  @IsString()
  readonly name: string;

  @IsDateString()
  readonly birthday: string;
}

export class CreateCatResponse {
  readonly id: number;
  readonly name: string;
  readonly birthday: string;
}

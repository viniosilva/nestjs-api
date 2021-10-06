export class CreateCatRequest {
  readonly name: string;
  readonly birthday: string;
}

export class CreateCatResponse {
  readonly id: number;
  readonly name: string;
  readonly birthday: string;
}

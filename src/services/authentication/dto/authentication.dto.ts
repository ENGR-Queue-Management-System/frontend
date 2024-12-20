export class AuthLoginRequestDTO {
  code: string = "";
  redirectUri: string = "";
}

export class ReserveRequestDTO {
  firstName: string = "";
  lastName: string = "";
  topic: number = 0;
  note?: string;
}

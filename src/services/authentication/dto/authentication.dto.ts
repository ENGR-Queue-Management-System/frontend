export class AuthLoginRequestDTO {
  code: string = "";
  redirectUri: string = "";
}

export class ReserveRequestDTO {
  topic: number = 0;
  firstName: string = "";
  lastName: string = "";
}

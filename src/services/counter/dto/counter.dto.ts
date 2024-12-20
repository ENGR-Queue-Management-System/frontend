export class CounterRequestDTO {
  counter: string = "";
  email: string = "";
}

export class CounterUpdateRequestDTO {
  counter?: string;
  status?: boolean;
  timeClosed?: string;
  email?: string;
}

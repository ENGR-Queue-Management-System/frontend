export class CounterRequestDTO {
  counter: string = "";
  email: string = "";
  timeClosed: string = "16:00:00";
  topics: number[] = [];
}

export class CounterUpdateRequestDTO {
  counter?: string;
  status?: boolean;
  timeClosed?: string;
  email?: string;
}

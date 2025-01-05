import { STATUS } from "@/config/Enum";

export class StudentQueueRequestDTO {
  firstName: string = "";
  lastName: string = "";
}

export class QueueRequestDTO {
  firstName?: string;
  lastName?: string;
  topic: number = 0;
  note?: string;
}

export class CallQueueRequestDTO {
  counter: number = 0;
  current: number = 0;
}

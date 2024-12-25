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

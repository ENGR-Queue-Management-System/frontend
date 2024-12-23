import { STATUS } from "@/config/Enum";

export interface IModelSubscription {
  firstName: string;
  lastName: string;
  endpoint: string;
  auth: string;
  p256dh: string;
}

export interface IModelCounter {
  id: number;
  counter: string;
  status: boolean;
  timeClosed: Date;
  user: IModelUser;
  topic: IModelTopic[];
}

export interface IModelUser {
  id?: number;
  studentId?: string;
  firstNameTH: string;
  lastNameTH: string;
  firstNameEN?: string;
  lastNameEN?: string;
  email?: string;
  counterId?: number;
  counter?: IModelCounter;
}

export interface IModelTopic {
  id: number;
  topicTH: string;
  topicEN: string;
  code: string;
}

export interface IModelQueue {
  id: number;
  no: string;
  studentId: string;
  firstname: string;
  lastname: string;
  topicId: number;
  topic: IModelTopic;
  note: string;
  status: STATUS;
  counterId?: number;
  createdAt: Date;
  waiting?: number;
}

export interface IModelFeedback {
  id: number;
  userId: number;
  user: IModelUser;
  topicId: number;
  topic: IModelTopic;
  feedback: string;
  createdAt: Date;
}

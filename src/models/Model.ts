import { STATUS } from "@/config/Enum";

export interface IModelSubscription {
  studentId: string;
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
  firstNameEN: string;
  lastNameEN: string;
  email: string;
  counterId?: number;
  counter?: IModelCounter;
}

export interface IModelTopic {
  id: number;
  topic: string;
  counterId?: number;
  counter?: IModelCounter;
}

export interface IModelQueue {
  id: number;
  no: string;
  studentId: string;
  firstname: string;
  lastname: string;
  topicId: number;
  topic: IModelTopic;
  description: string;
  status: STATUS;
  createdAt: Date;
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

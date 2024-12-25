import { isValidResponse } from "@/helpers/validation";
import { queueController } from "./queue.repository";
import { StudentQueueRequestDTO } from "./dto/queue.dto";

const queueService = queueController();

export const getQueues = async (params?: any) => {
  const res = await queueService.getQueues(params);
  return isValidResponse(res);
};

export const getStudentQueue = async (params: StudentQueueRequestDTO) => {
  const res = await queueService.getStudentQueue(params);
  return isValidResponse(res);
};

export const createQueue = async (params: any) => {
  const res = await queueService.createQueue(params);
  return isValidResponse(res);
};

export const updateQueue = async (id: number, params: any) => {
  const res = await queueService.updateQueue(id, params);
  return isValidResponse(res);
};

export const deleteQueue = async (id: number) => {
  const res = await queueService.deleteQueue(id);
  return isValidResponse(res);
};

import { isValidResponse } from "@/helpers/validation";
import { roomController } from "./counter.repository";
import { CounterRequestDTO } from "./dto/counter.dto";

const roomService = roomController();

export const getCounters = async () => {
  const res = await roomService.getCounters();
  return isValidResponse(res);
};

export const createCounter = async (params: CounterRequestDTO) => {
  const res = await roomService.createCounter(params);
  return isValidResponse(res);
};

export const deleteCounter = async (id: string) => {
  const res = await roomService.deleteCounter(id);
  return isValidResponse(res);
};

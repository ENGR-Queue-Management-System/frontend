import { isValidResponse } from "@/helpers/validation";
import { roomController } from "./counter.repository";
import { CounterRequestDTO, CounterUpdateRequestDTO } from "./dto/counter.dto";

const roomService = roomController();

export const getCounters = async () => {
  const res = await roomService.getCounters();
  return isValidResponse(res);
};

export const createCounter = async (params: CounterRequestDTO) => {
  const res = await roomService.createCounter(params);
  return isValidResponse(res);
};

export const updateCounter = async (
  id: number,
  params: CounterUpdateRequestDTO
) => {
  const res = await roomService.updateCounter(id, params);
  return isValidResponse(res);
};

export const deleteCounter = async (id: number) => {
  const res = await roomService.deleteCounter(id);
  return isValidResponse(res);
};

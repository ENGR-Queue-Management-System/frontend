import { isValidResponse } from "@/helpers/validation";
import { roomController } from "./room.repository";

const roomService = roomController();

export const getAllRooms = async () => {
  const res = await roomService.getAllRooms();
  return isValidResponse(res);
};

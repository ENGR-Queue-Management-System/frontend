import { IModelQueue } from "@/models/Model";
import store from "@/store";
import { setLoginNotCmu } from "@/store/config";
import { addNewQueue } from "@/store/queue";
import io, { Socket } from "socket.io-client";

export const socket: Socket | null = null;
// export const socket = io(process.env.NEXT_PUBLIC_BASE_API);

export default function setupSocket() {
  if (socket) {
    const dispatch = store.dispatch;
    const counter = store
      .getState()
      .counter.find(({ id }) => id == store.getState().user.user.id);

    // config
    socket.on("setLoginNotCmu", (data: boolean) => {
      dispatch(setLoginNotCmu(data));
    });

    // queue
    socket.on("addQueue", (data: IModelQueue) => {
      console.log("Queue added:", data);
      if (counter?.topics.find(({ id }) => id == data.topicId)) {
        dispatch(addNewQueue(data));
      }
    });
  }

  return () => {
    if (socket) {
      socket.off("setLoginNotCmu");
      socket.off("addQueue");
    }
  };
}

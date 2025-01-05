import store from "@/store";
import { setLoginNotCmu } from "@/store/config";
import { updateCounterData } from "@/store/counter";
import { addNewQueue, removeQueueByID, updateQueueByID } from "@/store/queue";
import { updateWaitingTopic } from "@/store/topic";

export default function setupSocket() {
  const socketUrl = process.env.NEXT_PUBLIC_WEB_SOCKET!;
  let socket = new WebSocket(socketUrl);
  let reconnectAttempts = 0;

  const dispatch = store.dispatch;
  const counter = store
    .getState()
    .counter.find(({ id }) => id == store.getState().user.user.id);

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
    reconnectAttempts = 0;
  };

  socket.onclose = (event) => {
    console.log("WebSocket closed", event);
    attemptReconnect();
  };

  socket.onerror = (error) => {
    console.log("WebSocket error", error);
    socket.close();
  };

  const attemptReconnect = () => {
    if (reconnectAttempts < 5) {
      reconnectAttempts++;
      const delay = Math.min(1000 * reconnectAttempts, 10000);
      console.log(`Reconnecting in ${delay / 1000} seconds...`);

      setTimeout(() => {
        socket = new WebSocket(socketUrl);
        setupSocket();
      }, delay);
    }
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // config
    if (data.event === "setLoginNotCmu") {
      dispatch(setLoginNotCmu(data.data));
    }

    // counter
    if (data.event === "updateCounter") {
      const counterData = data.data;
      dispatch(updateCounterData(counterData));
    }

    // queue
    if (data.event === "addQueue") {
      const queueData = data.data;
      if (counter?.topics.some(({ id }) => id == queueData.queue.topicId)) {
        dispatch(addNewQueue(queueData.queue));
      }
      dispatch(
        updateWaitingTopic({
          id: queueData.queue.topicId,
          waiting: queueData.waiting,
        })
      );
    }
    if (data.event === "updateQueue") {
      const queueData = data.data;
      if (counter?.topics.find(({ id }) => id == queueData.current.topicId)) {
        dispatch(updateQueueByID(queueData.current));
      }
    }
    if (data.event === "deleteQueue") {
      const queueData = data.data;
      dispatch(removeQueueByID(queueData));
    }
  };

  return () => {
    socket.close();
  };
}

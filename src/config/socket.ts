import store from "@/store";
import { setLoginNotCmu } from "@/store/config";
import {
  addCounter,
  removeCounter,
  updateCounterCurrentQueue,
  updateCounterData,
} from "@/store/counter";
import { addNewQueue, removeQueueByID, updateQueueByID } from "@/store/queue";
import {
  addTopic,
  removeTopic,
  updateTopicData,
  updateWaitingTopic,
} from "@/store/topic";

const socketUrl = process.env.NEXT_PUBLIC_WEB_SOCKET!;
export let socket = new WebSocket(socketUrl);

export default function setupSocket() {
  let socket = new WebSocket(socketUrl);

  const dispatch = store.dispatch;
  const counter = store
    .getState()
    .counter.find(({ id }) => id == store.getState().user.user.id);

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
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
    console.log(`Reconnecting...`);
    socket = new WebSocket(socketUrl);
    setupSocket();
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // config
    if (data.event === "setLoginNotCmu") {
      dispatch(setLoginNotCmu(data.data));
    }

    // counter
    if (data.event === "addCounter") {
      const counterData = data.data;
      dispatch(addCounter(counterData));
    }
    if (data.event === "updateCounter") {
      const counterData = data.data;
      dispatch(updateCounterData(counterData));
    }
    if (data.event === "deleteCounter") {
      const counterData = data.data;
      dispatch(removeCounter(counterData));
    }

    // topic
    if (data.event === "addTopic") {
      const topicData = data.data;
      dispatch(addTopic(topicData));
    }
    if (data.event === "updateTopic") {
      const topicData = data.data;
      dispatch(updateTopicData(topicData));
    }
    if (data.event === "deleteTopic") {
      const topicData = data.data;
      dispatch(removeTopic(topicData));
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
      dispatch(updateQueueByID(queueData.current));
      dispatch(updateCounterCurrentQueue(queueData.current));
    }
    if (data.event === "deleteQueue") {
      const queueData = data.data;
      dispatch(removeQueueByID(queueData));
    }
  };
}

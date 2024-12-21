import { isValidResponse } from "@/helpers/validation";
import { subscriptionController } from "./subscription.repository";

const subscriptionService = subscriptionController();

export const subscribeNotification = async (subscription: PushSubscription) => {
  const subscriptionData = {
    endpoint: subscription.endpoint,
    keys: {
      auth: btoa(
        String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!))
      ),
      p256dh: btoa(
        String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")!))
      ),
    },
  };
  const res = await subscriptionService.subscribeNotification(subscriptionData);
  return isValidResponse(res);
};

export const sendQueueNotification = async (params: any) => {
  const res = await subscriptionService.sendQueueNotification(params);
  return isValidResponse(res);
};

export const testSendNoti = async () => {
  const res = await subscriptionService.testSendNoti();
  return isValidResponse(res);
};

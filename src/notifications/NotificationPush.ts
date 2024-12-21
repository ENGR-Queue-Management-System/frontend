import { DEVICE_TYPE } from "@/config/Enum";

export const checkDeviceType = () => {
  const isIos = !!(
    typeof window !== "undefined" &&
    "standalone" in window.navigator &&
    window.navigator.standalone
  );
  const isAndroid =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches;
  const isDesktop =
    typeof window !== "undefined" &&
    (navigator.userAgent.includes("Win") ||
      navigator.userAgent.includes("Mac"));
  if (isIos) {
    return DEVICE_TYPE.IOS;
  } else if (isAndroid) {
    return DEVICE_TYPE.ANDROID;
  } else if (isDesktop) {
    return DEVICE_TYPE.DESKTOP;
  }
  return null;
};

export const isNotificationSupported = (): boolean => {
  let unsupported = false;
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true;
  }
  const check = checkDeviceType();
  return !unsupported && check != null;
};

export const isPermissionGranted = (): boolean => {
  return Notification.permission === "granted";
};

export const isPermissionDenied = (): boolean => {
  return Notification.permission === "denied";
};

export async function registerAndSubscribe(
  onSubscribe: (subs: PushSubscription | null) => void,
  onError: (e: Error) => void
): Promise<void> {
  try {
    await navigator.serviceWorker.register("./service-worker.js");
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });
      })
      .then((subscription: PushSubscription) => {
        console.info("Created subscription Object: ", subscription.toJSON());
        onSubscribe(subscription);
      })
      .catch((e) => {
        onError(e);
      });
  } catch (e: any) {
    onError(e);
  }
}

export async function Unsubscribe(
  onSubscribe: (subs: PushSubscription | null) => void,
  onError: (e: Error) => void
): Promise<void> {
  try {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager.getSubscription().then(function (subscription) {
        if (subscription) {
          subscription
            .unsubscribe()
            .then(function () {
              console.log("User unsubscribed");
              onSubscribe(null);
            })
            .catch((e) => {
              onError(e);
            });
        }
      });
    });
  } catch (e: any) {
    onError(e);
  }
}

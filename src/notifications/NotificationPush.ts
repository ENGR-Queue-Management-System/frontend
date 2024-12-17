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
  if (isAndroid) {
    return DEVICE_TYPE.ANDROID;
  } else if (isIos) {
    return DEVICE_TYPE.IOS;
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

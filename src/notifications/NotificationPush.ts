export function isNotificationSupported(): boolean {
  const isIos = !!(
    "standalone" in window.navigator && window.navigator.standalone
  );
  const isAndroid = !!window.matchMedia("(display-mode: standalone)").matches;
  const hasNotificationSupport =
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "showNotification" in ServiceWorkerRegistration.prototype;
  const isPwaInstalled = isIos || isAndroid;
  return hasNotificationSupport && isPwaInstalled;
}

export function isPermissionGranted(): boolean {
  return Notification.permission === "granted";
}

export function isPermissionDenied(): boolean {
  return Notification.permission === "denied";
}

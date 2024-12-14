export function isNotificationSupported(): boolean {
  let unsupported = false;
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true;
  }
  return !unsupported;
}

export function isPermissionGranted(): boolean {
  return Notification.permission === "granted";
}

export function isPermissionDenied(): boolean {
  return Notification.permission === "denied";
}

export function isNotificationSupported(): boolean {
  let unsupported = false;
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true;
  }
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
    (navigator.platform === "Win32" || navigator.platform === "MacIntel");

  return !unsupported && (isIos || isAndroid || isDesktop);
}

export function isPermissionGranted(): boolean {
  return Notification.permission === "granted";
}

export function isPermissionDenied(): boolean {
  return Notification.permission === "denied";
}

self.addEventListener("install", (event) => {
  console.info("service worker installed.");
  event.waitUntil(self.skipWaiting());
});

const sendDeliveryReportAction = () => {
  console.log("Web push delivered.");
};

self.addEventListener("push", function (event) {
  if (!event.data) {
    return;
  }

  const payload = event.data.json();
  const { body, icon, badge, url, title } = payload;
  const notificationTitle = title ?? "New Notifications";
  const notificationOptions = {
    body,
    icon: icon ?? "/icon-sd.png",
    data: {
      url,
    },
    badge,
  };

  event.waitUntil(
    self.registration
      .showNotification(notificationTitle, notificationOptions)
      .then(() => {
        sendDeliveryReportAction();
      })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const url = event.notification.data.url;

        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("Opening window.");
          return clients.openWindow(url || "/");
        }
      })
  );
});

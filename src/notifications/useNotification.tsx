import { IModelSubscription } from "@/models/Model";
import {
  checkDeviceType,
  isNotificationSupported,
  isPermissionDenied,
  isPermissionGranted,
} from "./NotificationPush";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { DEVICE_TYPE } from "@/config/Enum";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { subscribeNotification } from "@/services/subscription/subscription.service";
import { setSubscription } from "@/store/subscription";

interface NotificationContextType {
  deviceType: DEVICE_TYPE | null;
  isSupported: boolean;
  isGranted: boolean;
  isDenied: boolean;
  subscription: IModelSubscription;
  errorMessage: string | null;
  onSubscribe: () => void;
  onError: (e: Error) => void;
  getSubscription: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deviceType, setDeviceType] = useState<DEVICE_TYPE | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const subscription = useAppSelector((state) => state.subscription);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNotificationSupported()) {
      const type = checkDeviceType();
      setDeviceType(type);
      setIsSupported(true);
      const granted = isPermissionGranted();
      setIsGranted(granted);
      setIsDenied(isPermissionDenied());
    }
  }, []);

  const onSubscribe = () => {
    setIsGranted(isPermissionGranted());
    setIsDenied(isPermissionDenied());
  };

  const onError = (e: Error) => {
    console.error("Failed to subscribe cause of: ", e);
    setIsGranted(isPermissionGranted());
    setIsDenied(isPermissionDenied());
    setErrorMessage(e?.message);
  };

  const getSubscription = async (): Promise<void> => {
    await navigator.serviceWorker.register("/service-worker.js");
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        });
      })
      .then(async (subscription) => {
        const res = await subscribeNotification(subscription);
        if (res) {
          dispatch(setSubscription(res));
        }
        onSubscribe();
      })
      .catch((e) => onError(e));
  };

  const contextValue = useMemo(
    () => ({
      deviceType,
      isSupported,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      onSubscribe,
      onError,
      getSubscription,
    }),
    [
      deviceType,
      isSupported,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      onSubscribe,
      onError,
      getSubscription,
    ]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

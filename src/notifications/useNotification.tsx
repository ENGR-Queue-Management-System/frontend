import {
  checkDeviceType,
  isNotificationSupported,
  isPermissionDenied,
  isPermissionGranted,
  registerAndSubscribe,
} from "./NotificationPush";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEVICE_TYPE } from "@/config/Enum";

interface NotificationContextType {
  deviceType: DEVICE_TYPE | null;
  isPhone: boolean;
  isSupported: boolean;
  isGranted: boolean;
  isDenied: boolean;
  pushSubscription: PushSubscription | null;
  errorMessage: string | null;
  handleSubscribe: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deviceType, setDeviceType] = useState<DEVICE_TYPE | null>(null);
  const [isPhone, setIsPhone] = useState<boolean>(true);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [pushSubscription, setPushSubscription] =
    useState<PushSubscription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isNotificationSupported()) {
      const type = checkDeviceType();
      setDeviceType(type);
      setIsPhone([DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(type!));
      setIsSupported(true);
      const granted = isPermissionGranted();
      setIsGranted(granted);
      setIsDenied(isPermissionDenied());
      if (granted) {
        handleSubscribe();
      }
    }
  }, []);

  const handleSubscribe = () => {
    const onSubscribe = (subscription: PushSubscription | null) => {
      if (subscription) {
        setPushSubscription(subscription);
      }
      setIsGranted(isPermissionGranted());
      setIsDenied(isPermissionDenied());
    };
    const onError = (e: Error) => {
      console.error("Failed to subscribe cause of: ", e);
      setIsGranted(isPermissionGranted());
      setIsDenied(isPermissionDenied());
      setErrorMessage(e?.message);
    };
    registerAndSubscribe(onSubscribe, onError);
  };

  const contextValue = useMemo(
    () => ({
      deviceType,
      isPhone,
      isSupported,
      isGranted,
      isDenied,
      pushSubscription,
      errorMessage,
      handleSubscribe,
    }),
    [
      deviceType,
      isPhone,
      isSupported,
      isGranted,
      isDenied,
      pushSubscription,
      errorMessage,
      handleSubscribe,
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

import { IModelSubscription } from "@/models/Model";
import {
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
import { useAppSelector } from "@/store";

interface NotificationContextType {
  isSupported: boolean;
  isGranted: boolean;
  isDenied: boolean;
  subscription: IModelSubscription;
  errorMessage: string | null;
  onSubscribe: () => void;
  onError: (e: Error) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const subscription = useAppSelector((state) => state.subscription);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isNotificationSupported()) {
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

  const contextValue = useMemo(
    () => ({
      isSupported,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      onSubscribe,
      onError,
    }),
    [
      isSupported,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      onSubscribe,
      onError,
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

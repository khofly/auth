import { notifications, cleanNotifications } from '@mantine/notifications';

const useToast = () => {
  const clear = () => cleanNotifications();

  const toast = notifications;

  return {
    toast,
    clear,
  };
};

export default useToast;

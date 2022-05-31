import localforage from "localforage";
import { NOTIFICATION_KEY } from "../../constants/local-forage";

const NotificationsService = {
  getNotifications() {
    return localforage.getItem(NOTIFICATION_KEY);
  },

  saveNotifications(notification) {
    localforage.setItem(NOTIFICATION_KEY, notification);
  },

  removeNotifications() {
    localforage.removeItem(NOTIFICATION_KEY);
  },
};

export default NotificationsService;

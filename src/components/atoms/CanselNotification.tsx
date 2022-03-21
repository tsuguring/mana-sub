import * as Notifications from "expo-notifications";

export default async function canselNotification(props: string) {
  if (props !== "none") {
    await Notifications.cancelScheduledNotificationAsync(props);
  }
}

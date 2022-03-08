import * as Notifications from "expo-notifications";

export default async function canselNotification(props: string) {
  await Notifications.cancelScheduledNotificationAsync(
    `notificationId[${props}]`
  );
}

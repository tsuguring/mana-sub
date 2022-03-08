import * as Notifications from "expo-notifications";

type Data = {
  id: string;
  title: string;
  money: string;
  period: string;
  date: string;
  detail?: string;
};

export default async function addNotification(props: Data) {
  const { id, title, money, period, date } = props;
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate() - 2;
  const notificationId: any = {};
  if (period === "1") {
    notificationId[id] = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${title}の支払いが近づいています。`,
        body: `二日後に${money}円支払われます。`,
      },
      trigger: {
        repeats: true,
        day: day,
        hour: 9,
        minute: 0,
      },
    });
  } else {
    notificationId[id] = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${title}の支払いが近づいています。`,
        body: `二日後に${money}円支払われます。`,
      },
      trigger: {
        repeats: true,
        month: month,
        day: day,
        hour: 9,
        minute: 0,
      },
    });
  }
}

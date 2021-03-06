import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "firstopen";

export async function isInitialLaunch() {
  const opened = await AsyncStorage.getItem(KEY);
  return !!opened;
}

export async function markAsTutorialIsDone() {
  await AsyncStorage.setItem(KEY, JSON.stringify(true));
}

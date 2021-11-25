import firebase from "firebase";

export default function getFirestore(uid: string) {
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("subscriptions");
}

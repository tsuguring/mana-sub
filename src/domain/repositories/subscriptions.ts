import firestore from "../../lib/firebase/firestore";

export function getAll(userId: string) {
  return firestore(userId)
    .get()
    .then((querySnapshot) => {
      const subscriptions = querySnapshot.docs.reduce(
        (result: any, doc: any) => {
          result[doc.id] = doc.data();
          return result;
        },
        {}
      );
      return subscriptions;
    });
}

export function add(userId: string, newSubscription: any) {
  firestore(userId)
    .doc(newSubscription.id)
    .set(newSubscription)
    .catch((e) => {
      throw e;
    });
}

export function remove(userId: string, id: string) {
  firestore(userId)
    .doc(id)
    .delete()
    .catch((e) => {
      throw e;
    });
}

export function change(userId: string, id: string, newValue: object) {
  firestore(userId)
    .doc(id)
    .update(newValue)
    .catch((e) => {
      throw e;
    });
}

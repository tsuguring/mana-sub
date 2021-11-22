import { Dispatch } from "redux";
import * as SubscriptionsRepository from "../domain/repositories/subscriptions";
import { Subscription } from "../domain/models";
import { add, remove, update } from "../modules/subscriptions";

export function addAndSync(userId: string, newValues: Subscription.Values) {
  return async function (dispatch: Dispatch) {
    const newSubscription = Subscription.factory(newValues);
    dispatch(add(newSubscription));
    SubscriptionsRepository.add(userId, newSubscription);
  };
}

export function removeAndSync(userId: string, id: string) {
  return async function (dispatch: Dispatch) {
    dispatch(remove(id));
    SubscriptionsRepository.remove(userId, id);
  };
}

export function editAndSync(
  userId: string,
  id: string,
  newValues: Subscription.Values
) {
  return async function (dispatch: Dispatch) {
    dispatch(update(id, newValues));
    SubscriptionsRepository.change(userId, id, newValues);
  };
}

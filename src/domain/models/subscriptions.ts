import { filter } from "@januswel/object-utilities";
import * as Subscription from "./subscription";

export interface Model {
  [id: string]: Subscription.Model;
}

export function factory(newValues?: Subscription.Values[]): Model {
  if (!newValues) {
    return {};
  }

  return newValues.reduce<Model>((result, newValue) => {
    const newSubscription = Subscription.factory(newValue);
    result[newSubscription.id] = newSubscription;
    return result;
  }, {});
}

export function add(
  subscriptions: Model,
  newSubscription: Subscription.Model
): Model {
  return {
    ...subscriptions,
    [newSubscription.id]: newSubscription,
  };
}

export function remove(subscriptions: Model, targetId: string): Model {
  return filter(subscriptions, (id) => id !== targetId);
}

export function update(
  subscriptions: Model,
  id: string,
  values: Subscription.Values
): Model {
  return {
    ...subscriptions,
    [id]: Subscription.change(subscriptions[id], values),
  };
}

export function getNumof(subscriptions: Model): number {
  return Object.keys(subscriptions).length;
}

export function findByTitle(
  subscriptions: Model,
  title: string
): Subscription.Model[] {
  return Object.values(subscriptions).filter(
    (subscription) => subscription.title === title
  );
}

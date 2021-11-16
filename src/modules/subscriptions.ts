import { Subscription, Subscriptions } from "../domain/models";

export function createInitialState(): Subscriptions.Model {
  return Subscriptions.factory();
}

export type State = ReturnType<typeof createInitialState>;

export const SET = "mana-sub/subscriptions/set" as const;
export const ADD = "mana-sub/subscriptions/add" as const;
export const UPDATE = "mana-sub/subscriptions/update" as const;
export const REMOVE = "mana-sub/subscriptions/remove" as const;

export function set(subscriptions: Subscriptions.Model) {
  return {
    type: SET,
    payload: {
      subscriptions,
    },
  };
}

export function add(subscription: Subscription.Model) {
  return {
    type: ADD,
    payload: {
      subscription,
    },
  };
}

export function update(id: string, subscription: Subscription.Values) {
  return {
    type: UPDATE,
    payload: {
      id,
      subscription,
    },
  };
}

export function remove(id: string) {
  return {
    type: REMOVE,
    payload: {
      id,
    },
  };
}

export type Action =
  | Readonly<ReturnType<typeof set>>
  | Readonly<ReturnType<typeof add>>
  | Readonly<ReturnType<typeof update>>
  | Readonly<ReturnType<typeof remove>>;

export default function reducer(state = createInitialState(), action: Action) {
  switch (action.type) {
    case SET:
      return action.payload.subscriptions;
    case ADD:
      return Subscriptions.add(state, action.payload.subscription);
    case UPDATE: {
      const { payload } = action;
      return Subscriptions.update(state, payload.id, payload.subscription);
    }
    case REMOVE:
      return Subscriptions.remove(state, action.payload.id);
    default:
      return state;
  }
}

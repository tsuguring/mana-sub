import { combineReducers } from "redux";

import * as Subscriptions from "./subscriptions";

export function createInitialState() {
  return {
    subsciptions: Subscriptions.createInitialState(),
  };
}

export type AppState = Readonly<ReturnType<typeof createInitialState>>;

export default combineReducers<AppState>({
  subsciptions: Subscriptions.default,
});

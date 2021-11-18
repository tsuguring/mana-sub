import { AppState } from "../modules";
import { createSelector } from "reselect";

import * as Domain from "../domain/models";
import { Subscriptions } from "../components/organisms";

function selectSubscriptions(state: AppState) {
  return state.subsciptions;
}

export const getArray = createSelector([selectSubscriptions], (subscriptions) =>
  Object.values(subscriptions).map((subscription) => ({
    id: subscription.id,
    title: subscription.title,
    money: subscription.money,
    period: subscription.period,
    date: subscription.period,
    detail: subscription.detail,
  }))
);

export const getStatistics = createSelector([getArray], (subscriptions) => {
  const numofAll = subscriptions.length;

  return {
    numofAll,
  };
});

export const getSubscriptions = createSelector([getArray], (subscriptions) =>
  subscriptions.sort((a, b) => b.money - a.money)
);

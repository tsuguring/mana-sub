import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getSubscriptions } from "../selectors/subscriptions";
import * as Subscriptions from "../modules/subscriptions";
import { Home } from "../components/pages";

export default function ConnectedHome() {
  const subscriptions = useSelector(getSubscriptions);
  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      removeSubscription(id: string) {
        dispatch(Subscriptions.remove(id));
      },
    }),
    [dispatch]
  );

  return <Home subscriptions={subscriptions} actions={actions} />;
}

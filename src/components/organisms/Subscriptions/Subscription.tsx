import React from "react";
import SubscriptionDisplay from "../../molecules/Subscription";

export interface GotoDetail {
  (state: State): void;
}

export interface State {
  id: string;
  title: string;
  money: string;
  period: string;
  date: string;
  detail?: string;
}

export interface Actions {
  gotoDetail: GotoDetail;
}

interface Props {
  state: State;
  actions: Actions;
}

export function Component(props: Props) {
  const {
    state,
    actions: { gotoDetail },
  } = props;

  const onPress = React.useCallback(() => {
    gotoDetail(state);
  }, [state, gotoDetail]);

  return (
    <SubscriptionDisplay
      onPress={onPress}
      title={state.title}
      money={state.money}
      period={state.period}
      date={state.date}
      detail={state.detail}
    />
  );
}

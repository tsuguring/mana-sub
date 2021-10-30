import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR } from "../../../constants/theme";
import SubscribeDisplay from "../../molecules/Subscribe";

export interface GotoDetail {
  (state: State): void;
}

export interface State {
  id: string;
  title: string;
  money: string;
  period: string;
  detail?: string;
}

type Omitdatestate = Omit<State, "date">;

export interface Actions {
  gotoDetail: GotoDetail;
}

interface Props {
  state: Omitdatestate;
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
    <SubscribeDisplay
      onPress={onPress}
      title={state.title}
      money={state.money}
      period={state.period}
      detail={state.detail}
    />
  );
}

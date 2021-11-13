import "react-native-get-random-values";
import { sub } from "react-native-reanimated";
import { v4 as generateUuid } from "uuid";

export interface Values {
  readonly title: string;
  readonly money: string;
  readonly period: string;
  readonly date: string;
  readonly detail?: string;
}

export interface Model {
  readonly id: string;
  readonly title: string;
  readonly money: string;
  readonly period: string;
  readonly date: string;
  readonly detail?: string;
}

export function factory(subscription: Values): Model {
  return {
    id: generateUuid(),
    title: subscription.title,
    money: subscription.money,
    period: subscription.period,
    date: subscription.date,
    detail: subscription.detail,
  };
}

export function change(subscription: Model, newValues: Values): Model {
  return {
    ...subscription,
    ...newValues,
  };
}

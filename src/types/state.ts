import { AxiosInstance } from "axios";
import { store } from "../store";
import { BrowserHistory } from "history";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AxiosAndHistory = {
  api: AxiosInstance;
  history: BrowserHistory;
};

export type AppThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosAndHistory;
};

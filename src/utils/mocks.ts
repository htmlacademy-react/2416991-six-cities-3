import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { AxiosInstance } from 'axios';

export type AppThunkDispatch = ThunkDispatch<
  State,
  { api: AxiosInstance },
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

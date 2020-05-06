import {createSlice} from "@reduxjs/toolkit";
import {setter} from "../utils/setter";

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token') || process.env.REACT_APP_TOKEN || '';

export enum SWStatus {
  WAITING,
  ACTIVE
}

export enum ThemeMode {
  DARK,
  LIGHT
}

export interface SystemState {
  status?: SWStatus,
  sw?: ServiceWorker | null,
  fetching: number,
  themeMode?: ThemeMode,
  token: string
}

const initialState: SystemState = {
  fetching: 0,
  token
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setStatus: setter(initialState, 'status'),
    setSW: setter(initialState, 'sw'),
    setThemeMode: setter(initialState, 'themeMode'),
    inc: (s: SystemState) => {
      s.fetching += 1
    },
    dec: (s: SystemState) => {
      s.fetching -= 1
    }
  }
});

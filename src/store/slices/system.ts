import {createSlice} from "@reduxjs/toolkit";
import {setter} from "../utils/setter";

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
}

const initialState: SystemState = {
  fetching: 0,
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

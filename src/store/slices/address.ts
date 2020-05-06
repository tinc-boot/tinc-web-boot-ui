import {createSlice} from "@reduxjs/toolkit";
import {setter} from "../utils/setter";
import {Endpoint} from "../../api/tincwebui";

export interface AddressState {
  list?: Endpoint[]
}

const initialState: AddressState = {}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setList: setter(initialState, 'list')
  }
})

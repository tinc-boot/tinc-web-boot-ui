import {bindActionCreators, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import {systemSlice} from "./slices/system";
import {networksSlice} from "./slices/networks";
import {addressSlice} from "./slices/address";

const composeEnhancers = composeWithDevTools({

});

const reducer = combineReducers({
  system: systemSlice.reducer,
  networks: networksSlice.reducer,
  address: addressSlice.reducer
});

export type AppState = ReturnType<typeof reducer>

export const store = createStore(reducer, composeEnhancers())

export const dispatcher = {
  system: bindActionCreators(systemSlice.actions, store.dispatch),
  networks: bindActionCreators(networksSlice.actions, store.dispatch),
  address: bindActionCreators(addressSlice.actions, store.dispatch)
}

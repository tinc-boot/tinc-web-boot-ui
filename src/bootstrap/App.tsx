import React from "react";
import {Routing} from "./Routing";
import {Provider} from "react-redux";
import {store} from "../store";
import {Theme} from "./Theme";


export const App = () => {
  console.log('!!! App')

  return (
    <Provider store={store}>
      <Theme>
        <Routing />
      </Theme>
    </Provider>
  )
}

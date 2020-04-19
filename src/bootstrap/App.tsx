import React from "react";
import {Routing} from "./Routing";
import {Provider} from "react-redux";
import {store} from "../store";
import {Theme} from "./Theme";
import {CssBaseline} from "@material-ui/core";


export const App = () => {

  return (
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        <Routing />
      </Theme>
    </Provider>
  )
}

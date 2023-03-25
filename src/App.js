import * as React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarCustom from "./components/NavbarCustom";

import home from "./pages/home";
import schedules from "./pages/schedules";
import gear from "./pages/gear";
import contact from "./pages/contact";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <Router>
        <div className="App">
          <CssBaseline />
            <NavbarCustom />

          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/schedules" exact component={schedules} />
            <Route path="/gear" exact component={gear} />
            <Route path="/contact" exact component={contact} />
          </Switch>
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;

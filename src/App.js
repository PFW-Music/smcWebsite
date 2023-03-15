import * as React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./containers";

import home from "./pages/home";
import schedules from "./pages/schedules";
import gear from "./pages/gear";
import contact from "./pages/contact";

const theme = createTheme(adaptV4Theme({
  palette: {
    background: {
      default: "#e8d6c0",
    },
    primary: {
      main: "#2e1667",
    },
    secondary: {
      main: "#c7d8ed",
    },
  },
  typography: {
    fontFamily: ["Roboto"],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: "2rem",
    },
    h5: {
      fontWeight: 100,
      lineHeight: "2rem",
    },
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage:
            "url(https://www.pfw.edu/themes/fire/theme/assets/media/images/texture--gray.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      },
    },
  },
}));

function App() {
  return (
    <Router>
      <div className="App">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <div className="navbar">
              <Navbar />
            </div>

            <Switch>
              <Route path="/" exact component={home} />
              <Route path="/schedules" exact component={schedules} />
              <Route path="/gear" exact component={gear} />
              <Route path="/contact" exact component={contact} />
            </Switch>
          </ThemeProvider>
        </StyledEngineProvider>
      </div>
    </Router>
  );
}

export default App;

import * as React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import NavBar from "./components/navBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import home from "./pages/home";
import schedules from "./pages/schedules";
import gear from "./pages/gear";
import contact from "./pages/contact";

const theme = createTheme({
  palette: {
    background: {
      default: "#e8d6c0"
    },
    primary: {
      main: "#2e1667"
    },
    secondary: {
      main: "#c7d8ed"
    }
  },
  typography: {
    fontFamily: ["Roboto"],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: "2rem"
    },
    h5: {
      fontWeight: 100,
      lineHeight: "2rem"
    }
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: "url(https://www.pfw.edu/themes/fire/theme/assets/media/images/texture--gray.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }
      }
    }
  }
});

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />

          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/schedules" exact component={schedules} />
            <Route path="/gear" exact component={gear} />
            <Route path="/contact" exact component={contact} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;

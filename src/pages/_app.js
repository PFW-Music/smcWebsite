import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
	createTheme as createNextUITheme,
	NextUIProvider,
} from "@nextui-org/react";

const muiDarkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const nextUITheme = createNextUITheme({
	type: "dark",
	theme: {
		colors: {
			primary: "#4ADE7B",
			secondary: "#F9CB80",
			error: "#FCC5D8",
			selection: "#000000",
			foreground: "#adadad",
			background: "#171717",
		},
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={muiDarkTheme}>
			<NextUIProvider theme={nextUITheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</NextUIProvider>
		</ThemeProvider>
	);
}

export default MyApp;

import {GameScreen} from "./pages"
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Provider} from "react-redux";
import {store} from "./redux";

const globalTheme = createTheme({
    typography: {
        fontFamily: "Hubballi, cursive"
    }
})

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={globalTheme}>
                <CssBaseline/>
                <GameScreen/>
            </ThemeProvider>
        </Provider>
    );
}

export default App;

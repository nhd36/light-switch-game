import {GameScreen} from "./pages"
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Provider} from "react-redux";
import {reduxStore} from "./redux";

const globalTheme = createTheme({
    typography: {
        fontFamily: "Hubballi, cursive"
    }
})

function App() {
    const store = reduxStore
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

import "./App.scss";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import AppInventory from "./components/AppInentory.tsx";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./components/Header.tsx";
function App() {
  return (
    <>
      <>
        <CssBaseline />
        <Header />
        <Box>
          <div className="container">
            <Toolbar />
            <Provider store={store}>
              <AppInventory />
            </Provider>
          </div>
        </Box>
      </>
    </>
  );
}

export default App;

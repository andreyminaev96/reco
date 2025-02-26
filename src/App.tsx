import "./App.scss";
import { Button } from "@mui/material";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="container">
          <Button>Hi</Button>
        </div>
      </Provider>
    </>
  );
}

export default App;

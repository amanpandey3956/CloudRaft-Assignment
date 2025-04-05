import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter";
import store from "./store/store"; 

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

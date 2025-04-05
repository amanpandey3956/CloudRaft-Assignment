import React from "react";
import { Routes, Route} from "react-router-dom";
import Layout from "../components/Layout";

const AppRouter = () => {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
        </Route>
    </Routes>
  );
};

export default AppRouter;

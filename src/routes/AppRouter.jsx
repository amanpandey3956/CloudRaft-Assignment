import React from "react";
import { Routes, Route} from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/dashboard"

const AppRouter = () => {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
        </Route>
    </Routes>
  );
};

export default AppRouter;

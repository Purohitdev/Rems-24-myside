import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";

import Login from "./Auth/Login";
import Layout from "./Dashbored/Layout";
import Home from "./Dashbored/Home";
import Projects from "./Dashbored/Projects";
import Inverters from "./Dashbored/Inverters";
import Transformers from "./Dashbored/Transformers";
import ACDB from "./Dashbored/ACDB";
import HTPanel from "./Dashbored/HTpannel";
import WMS from "./Dashbored/WMS";
import PR from "./Dashbored/PR";
import Pv from "./Dashbored/Pv";

function PrivateRoute({ children }: { children: ReactElement }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="inverters" element={<Inverters />} />
          <Route path="acdb" element={<ACDB />} />
          <Route path="transformers" element={<Transformers />} />
          <Route path="htpanel" element={<HTPanel />} />
          <Route path="wms" element={<WMS />} />
          <Route path="pr" element={<PR />} />
          <Route path="pv" element={<Pv />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

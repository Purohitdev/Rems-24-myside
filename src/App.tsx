import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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


function PrivateRoute({ children }: { children: JSX.Element }) {
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
          <Route path="Inverters" element={<Inverters />} />
          <Route path="ACDB" element={<ACDB />} />
          <Route path="Transformers" element={<Transformers />} />
          <Route path="HTPanel" element={<HTPanel />} />
          <Route path="WMS" element={<WMS />} />
          <Route path="PR" element={<PR />} />
                    <Route path="Pv" element={<Pv />} />




        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Users from "./pages/Users.tsx";
import Logs from "./pages/Logs.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/logs"
        element={
          <ProtectedRoute>
            <Logs />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

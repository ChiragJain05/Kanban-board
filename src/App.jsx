import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./utils/auth";
import Landing from "./pages/Landing";
import Board from "./pages/Board";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children }) {
  return getUser() ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#27272a",
            color: "#fff",
            border: "1px solid #3f3f46",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

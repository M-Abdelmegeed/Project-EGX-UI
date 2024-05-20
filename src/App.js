import Login from "./Pages/Login";
import Chatbot from "./Pages/Chatbot.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./UserAuthContext.js";
import ProtectedRoute from "./private-routes.js";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/Chatbot" element={<Chatbot />} /> */}
          <Route
            path="/Chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;

import "./App.css";
import Header from "./components/Header";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const userToken = localStorage.getItem("authToken");
  const isAuth = userToken ? true : false;
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {isAuth ? (
          <Profile />
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Register />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

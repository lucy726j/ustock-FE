import "./App.css";
import React from "react";
import { GlobalStyle } from "./Styles/GlobalStyles";
import Router from "./Router";
import "./App.css";
import { useAuth } from "./contexts/authContext";
import GoogleLogin from "./Component/GoogleLogin/login";
import Header from "./Component/Layout/Header/Header";
import Profile from "./Component/Layout/Header/Profile";

function App() {
  const { user } = useAuth();
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

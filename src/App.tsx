import "./App.css";
import { GlobalStyle } from "./Styles/GlobalStyles";
import Router from "./Router";
import { useAuth } from "./contexts/authContext";

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

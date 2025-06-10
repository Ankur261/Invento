import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {

  return (

    <Router>
      <AppRoutes />
    </Router>
  );
}


export default App;

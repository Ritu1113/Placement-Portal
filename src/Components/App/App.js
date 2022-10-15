// Routing
import { Routes, Route } from "react-router-dom";

// Components
import Home from "../Home/Home";
import Login from "../Auth/Login/Login";
import Recovery from "../Auth/Recovery/Recovery";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Recovery">
          <Route path=":email" element={<Recovery />} />
          <Route path="" element={<Recovery />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

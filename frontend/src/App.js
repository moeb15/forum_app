import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './styles/App.css'
import Homepage from "./components/Homepage";
import Postpage from "./components/Postpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/home" Component={Homepage}/>
          <Route path="/post" Component={Postpage}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './styles/App.css'
import Homepage from "./components/Homepage";
import Postpage from "./components/Postpage";
import UserHome from "./components/UserHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/home" Component={Homepage}/>
          <Route path="/post" Component={Postpage}/>
          <Route path="/user" Component={UserHome}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

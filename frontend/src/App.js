import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './styles/App.css'
import Homepage from "./components/Homepage";
import Postpage from "./components/Postpage";
import UserHome from "./components/UserHome";
import SearchPage from "./components/SearchPage";
import Header from "./components/Header";

function App() {
  return (
      <BrowserRouter>
        <Header className={localStorage.getItem("token")!=="" ?
                           "":"hidden"} />
        <div className="App py-4">
          <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/home" Component={Homepage}/>
            <Route path="/post" Component={Postpage}/>
            <Route path="/user" Component={UserHome}/>
            <Route path="/search" Component={SearchPage}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;

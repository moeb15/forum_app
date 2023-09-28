import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [ pwd,setPwd ] = useState("");
    const [ user,setUser ] = useState("");
    const navigate = useNavigate();
    const login_url = "http://localhost:8000/auth/login"
    
    const loginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(login_url,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                username:user,
                password:pwd
            })
        })
        const content = await response.json()
        if(content.hasOwnProperty('jwt')){
            localStorage.setItem("token",content.jwt);
            navigate("/home");
        }
    }
    return(
        <div className="auth-form-container">
            <form className="login-form" onSubmit={loginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                    placeholder="Username" 
                    id="username" 
                    name="username"
                    value={user}
                    onChange={e=>setUser(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password"
                    value={pwd}
                    onChange={e=>setPwd(e.target.value)}/>
                    
                <button className="auth-btn">Login</button>
            </form>
            
            <Link to="/register" className="link-btn redirect-btn">Don't have an account? Register here</Link>
        </div>
    )
}

export default Login;
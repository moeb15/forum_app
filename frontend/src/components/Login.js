import { useState, React } from "react";

function Login(){
    const [ pwd,setPwd ] = useState("");
    const [ user,setUser ] = useState("");

    const loginSubmit = e => {
        e.preventDefault();
        alert(`${user} ${pwd}`);
    }
    return(
        <div className="auth-form-container">
            <form className="login-form" onSubmit={loginSubmit}>
                <label for="username">Username</label>
                <input type="text" 
                    placeholder="Username" 
                    id="username" 
                    name="username"
                    value={user}
                    onChange={e=>setUser(e.target.value)}/>

                <label for="password">Password</label>
                <input type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password"
                    value={pwd}
                    onChange={e=>setPwd(e.target.value)}/>
                    
                <button>Login</button>
            </form>

            <button className="link-btn">Don't have an account? Register here</button>
        </div>
    )
}

export default Login;
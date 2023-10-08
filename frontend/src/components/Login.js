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
            localStorage.setItem("username",user);
            navigate("/home");
        }
    }
    return(
        <div className="md:shadow-md md:shadow-black 
                        m-4  p-[10vh] text-gray-300">
            <form className="flex flex-col" onSubmit={loginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                    placeholder="Username" 
                    id="username" 
                    name="username"
                    value={user}
                    onChange={e=>setUser(e.target.value)}
                    className="bg-black"/>

                <label htmlFor="password">Password</label>
                <input type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password"
                    value={pwd}
                    onChange={e=>setPwd(e.target.value)}
                    className="bg-black"/>
                    
                <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black">Login</button>
            </form>
            
            <div className="py-4">
                <Link to="/register" className="border-none text-white p-[20px] rounded-[10px]
                                        cursor-pointer text-sm underline bottom-0">
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    )
}

export default Login;
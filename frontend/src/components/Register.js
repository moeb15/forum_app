import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){
    const [ pwd,setPwd ] = useState("");
    const [ cnfpwd, setCnfpwd ] = useState("");
    const [ user,setUser ] = useState("");
    const register_url = "http://localhost:8000/auth/register"

    const registerSubmit = async(e) => {
        e.preventDefault();
        if(cnfpwd !== pwd){
            alert("Passwords do not match!")
        }
        
        const response = await fetch(register_url,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                username:user,
                password:pwd
            })
        })
        const content = await response.json()
        
        if(content.hasOwnProperty("error")){
            alert(`Username ${user} is already in use`)
        }else{
            alert("Account created!")
        }
    }
    return(
        <div className="auth-form-container"> 
            <form className="login-form" onSubmit={registerSubmit}>
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
                
                <label for="cnfrmpwd">Confirm Password</label>
                <input type="password" 
                    placeholder="Password" 
                    id="cnfrmpwd" 
                    name="cnfrmpwd"
                    value={cnfpwd}
                    onChange={e=>setCnfpwd(e.target.value)}/> 
                <button className="auth-btn">Register</button>
            </form>

            <Link to="/" className="link-btn redirect-btn">Already have an account? Login here</Link>
        </div>
    )
}

export default Register;
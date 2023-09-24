import { useState } from "react";

function Register(){
    const [ pwd,setPwd ] = useState("");
    const [ cnfpwd, setCnfpwd ] = useState("");
    const [ user,setUser ] = useState("");

    const registerSubmit = e => {
        e.preventDefault();
        if(cnfpwd !== pwd){
            alert("Passwords do not match!")
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
                <button>Register</button>
            </form>

            <button className="link-btn">Already have an account? Login here</button>
        </div>
    )
}

export default Register;
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
        <div className="md:border-solid md:border-[0.1vh] md:rounded-md md:border-white
                            m-4  p-[10vh] text-gray-300"> 
            <form className="flex flex-col" onSubmit={registerSubmit}>
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
                
                <label htmlFor="cnfrmpwd">Confirm Password</label>
                <input type="password" 
                    placeholder="Password" 
                    id="cnfrmpwd" 
                    name="cnfrmpwd"
                    value={cnfpwd}
                    onChange={e=>setCnfpwd(e.target.value)}
                    className="bg-black"/> 
                <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black">Register</button>
            </form>
            <div className="py-4">
                <Link to="/" className="border-none text-white p-[20px] rounded-[10px]
                                        cursor-pointer text-sm underline bottom-0">
                    Already have an account? Login here
                </Link>
            </div>
        </div>
    )
}

export default Register;
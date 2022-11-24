import React, {useState} from 'react'
import {login, useLoggedIn} from './cart';
const Login = () => {
    const loggedIn = useLoggedIn();
    const [showLogin,setShowLogin] = useState(false); //state to show the login dropdown
    const [username,setUsername] = useState("sally");
    const [password,setPassword] = useState("123");

    if(loggedIn) return null;
    return (
        <>
            <span onClick={()=>setShowLogin(!showLogin)}>
                <i className='ri-fingerprint-line text-2xl' id="showlogin" />
            </span>
            {
                //show the dropdown
                showLogin&&
                <div 
                    className="absolute p-5 border-4 border-blue-800 bg-white rounded-xl text-black" 
                    style={{
                        width:300, 
                        top:"2rem",
                        left: -250
                    }}
                >
                    <input 
                        type="text" 
                        placeholder="username"
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                        className="border text-sm border-gray-400 p-2 rounded-md w-full"
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        className="border text-sm border-gray-400 p-2 rounded-md w-full mt-3"
                    />
                    <button 
                        onClick={()=>login(username,password)}
                        id="loginbtn"
                        className="bg-green-900 text-white py-2 px-5 rounded-md text-sm mt-5"
                    >
                        Login
                    </button>

                </div>
            }
        </>
    )
}

export default Login
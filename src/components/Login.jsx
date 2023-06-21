import React, { useState } from 'react'
import axios from "axios"
const Login = () => {
    
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const {data:userData} = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        
       setUser(userData)
       
        } catch (err) {
          setError(true);
        }
        setUsername('')
        setPassword('')
        setLoading(false);
      };
      

  return (
    <div className='login-container'>
    <span className="username" data-testid="usern">{user?.name}</span>
        <form>
        <input placeholder="Username..." type="text" value={username} onChange={e=> setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=> setPassword(e.target.value)}  />
        <button disabled={(username && password)? false:true} onClick={handleLogin}>{loading? 'Please Wait':'Login'}</button>
        <span style={{color:'red', visibility: error?'visible':'hidden'}} data-testid="login-error" >Something went wrong!</span>
        </form>
    </div>

  )
}

export default Login

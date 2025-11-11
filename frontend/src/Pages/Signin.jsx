import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signin() {
  const [userName,setUserName] = useState();
  const [password,setPassword] = useState();
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = async()=>{
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/user/signin`,{
        userName,password
      })
      if(response.data.success){
        alert(response.data.message);
        localStorage.setItem("token",response.data.token)
        navigate('/dashboard')
        
      }
      else {
        alert.response.data.message 
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-blue-200 rounded-lg p-8 shadow-sm bg-white">
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-900">Sign in</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input onChange={(e)=>{
              setUserName(e.target.value)
            } } value={userName} className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="john_doe" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input onChange={(e)=>{
              setPassword(e.target.value)
            } } value={password} type="password" className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" />
          </div>
          {
            loading && <button type="button" className="w-full bg-blue-400 hover:bg-blue-700 text-white rounded-md py-2">Loading ...</button>
          }
          {
            !loading && <button onClick={handleClick} type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2">Submit</button>
          }
        </form>
      </div>
    </div>
  )
}

export default Signin



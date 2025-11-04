import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userName,setUserName] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = async ()=>{
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",
        {userName : userName , firstName  : firstName, lastName : lastName , password : password}
      )
      if(response.data.success){
        alert(response.data.message)
        localStorage.setItem("token",response.data.token)
        navigate('/dashboard')
      }
      else{
        alert(response.data.message) 
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-blue-50 text-blue-900 flex items-center justify-center px-4'>
      <div className='w-full max-w-md border border-blue-200 rounded-lg p-8 shadow-sm bg-white'>
        <h1 className='text-2xl font-semibold mb-6 text-center text-blue-900'>Create account</h1>
        <form className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm mb-1'>First name</label>
              <input onChange = {(e)=>{
                setFirstName(e.target.value)
              }} value={firstName} className='w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='John' />
            </div>
            <div>
              <label className='block text-sm mb-1'>Last name</label>
              <input onChange = {(e)=>{
                setLastName(e.target.value)
              }} value={lastName} className='w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='Doe' />
            </div>
          </div>
          <div>
            <label className='block text-sm mb-1'>Username</label>
            <input onChange = {(e)=>{
                setUserName(e.target.value)
              }} value={userName} className='w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='john_doe' />
          </div>
          <div>
            <label className='block text-sm mb-1'>Password</label>
            <input onChange = {(e)=>{
                setPassword(e.target.value)
              }} value={password} type='password' className='w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='••••••••' />
          </div>
          <button onClick={handleClick} type='button' className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2'>Create account</button>
        </form>
        <p className='text-sm text-blue-700 mt-4 text-center'>
          Already have an account? <a className='underline text-blue-700 hover:text-blue-800' href='/signin'>Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default Signup

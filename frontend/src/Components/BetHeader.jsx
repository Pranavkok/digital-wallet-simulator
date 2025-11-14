import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const BetHeader = () => {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login,setLogin] = useState(false);
    const [balance,setBalance] = useState(0);
  
    const navigate = useNavigate();

    const fetchBalance = async() => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/acc/balance`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.data.success) {
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchBalance();
    }, [])
  
    const fetchProfile = async() => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.data.success) {
          setUserName(response.data.user.userName);
          setFirstName(response.data.user.firstName);
          setLastName(response.data.user.lastName);
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=>{
      if(localStorage.getItem('token')){
        setLogin(true);
      }else{
        setLogin(false);
      }
      fetchProfile()
    }
    ,[])
  return (
    <header className="bg-green-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1 onClick={()=>{navigate('/dashboard')}} className="text-3xl font-bold">Hello {firstName} {lastName} !</h1>
          <nav className=" flex items-center gap-10">
            <button className="bg-green-500 hover:bg-green-700 p-3 rounded-xl ">Balance : ₹{balance.toFixed(2)}</button>
            <div className="flex items-center justify-center flex-row gap-5">
              {login && <button onClick ={()=>{
                localStorage.removeItem('token');
                navigate('/')
              }} className="w-20 h-10 rounded  bg-green-500 text-white grid place-items-center text-sm font-bold hover:bg-green-700 transition-colors">Log Out</button>}
              {!login && <button onClick ={()=>{
                navigate('/signin')
              }} className="w-20 h-10 rounded  bg-green-500 text-white grid place-items-center text-sm font-bold hover:bg-green-700 transition-colors">Log In</button>}
              <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-green-700 text-white grid place-items-center text-sm font-bold hover:bg-green-900 transition-colors">
                {userName ? userName[0].toUpperCase() : "U"}
              </button>
            </div>
          </nav>
        </div>
      </header>
  )
}

export default BetHeader

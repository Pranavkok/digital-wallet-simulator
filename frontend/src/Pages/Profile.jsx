import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Profile() {

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login,setLogin] = useState(false);

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

    useEffect(() => {
      if(localStorage.getItem('token')){
        setLogin(true);
      }else{
        setLogin(false);
      }
      fetchProfile();
    }, [])

    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="border-b border-blue-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div onClick={()=>{
                navigate('/dashboard')
            }}>
                <h1 className="text-2xl font-semibold text-blue-900">Hello {userName}!</h1>
            </div>
          <div className="flex items-center justify-center flex-row gap-5">
            {login && <button onClick ={()=>{
              localStorage.removeItem('token');
              navigate('/')
            }} className="w-20 h-10 rounded  bg-blue-600 text-white grid place-items-center text-sm font-bold hover:bg-blue-400 transition-colors">Log Out</button>}
            {!login && <button onClick ={()=>{
              navigate('/signin')
            }} className="w-20 h-10 rounded  bg-blue-600 text-white grid place-items-center text-sm font-bold hover:bg-blue-400 transition-colors">Log In</button>}
            <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center text-sm font-bold hover:bg-blue-700 transition-colors">
              {userName ? userName[0].toUpperCase() : "U"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-blue-200 rounded-lg p-8 shadow-sm text-center">
            <div className="w-32 h-32 rounded-full bg-blue-600 text-white grid place-items-center font-semibold text-5xl mx-auto mb-6">
              {userName ? userName[0].toUpperCase() : "U"}
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">{firstName} {lastName}</h2>
            <p className="text-lg text-blue-600 mb-6">@{userName}</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile

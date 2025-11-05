import axios from "axios"
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"

function Profile() {

    const [user,setUser] = useState({});
    const navigate = useNavigate();

    const getUserInfo = async () => {

        try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error)
      }

    }

    useEffect(()=>{
        getUserInfo();
    },[])



    return(
        <div className="min-h-screen bg-blue-50">
            <header className="border-b border-blue-100 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-blue-900">Profile</h1>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                    Back to Dashboard
                </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-white border border-blue-200 rounded-lg p-8 shadow-sm">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 text-white grid place-items-center text-3xl font-semibold">
                    {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-blue-900">
                    {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-blue-600 text-sm">@{user.userName}</p>
                </div>

                <div className="border-t border-blue-100 pt-6 space-y-4 text-lg">
                    <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">First Name:</span>
                    <span className="text-blue-900">{user.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">Last Name:</span>
                    <span className="text-blue-900">{user.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">Username:</span>
                    <span className="text-blue-900">{user.userName}</span>
                    </div>
                </div>
                </div>
            </main>
    </div>
  );
}

export default Profile
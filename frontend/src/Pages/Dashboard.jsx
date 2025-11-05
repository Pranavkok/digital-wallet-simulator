import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Dashboard() {

    const [balance, setBalance] = useState(0);
    const [userName, setUserName] = useState("");
    const [search, setSearch] = useState("");
    const [data, setData] = useState([])
    const [login,setLogin] = useState(false);

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
          setUserName(response.data.userName)
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
      fetchBalance();
    }, [])

    const navigate = useNavigate()

    const bulkFetch = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/user/bulk?filter=${search}`)
        if(response.data.success) {
          console.log(response.data.user)
          setData(response.data.user)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      bulkFetch()
    }, [search])

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="border-b border-blue-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-blue-900">Hello {userName}!</h1>
          <div className="flex items-center justify-center flex-row gap-5">
            {login && <button onClick ={()=>{
              localStorage.removeItem('token');
              navigate('/')
            }} className="w-20 h-10 rounded  bg-blue-600 text-white grid place-items-center text-sm font-bold hover:bg-blue-400 transition-colors">Log Out</button>}
            {!login && <button onClick ={()=>{
              navigate('/signin')
            }} className="w-20 h-10 rounded  bg-blue-600 text-white grid place-items-center text-sm font-bold hover:bg-blue-400 transition-colors">Log In</button>}
            <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center text-sm font-bold hover:bg-blue-700 transition-colors">
            {userName ? userName[0].toUpperCase() : "U"}
          </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="mb-6 bg-white border border-blue-200 rounded-lg p-8 shadow-sm">
            <div className="mb-2 text-sm font-medium text-blue-600 uppercase tracking-wider">
              Your Balance 
            </div>
            <div className="text-6xl font-bold text-blue-900">
              ₹{balance.toFixed(2)}
            </div>
          </div>

          <div className="relative">
            <input
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              value={search}
              type="text"
              placeholder="Search for Friends..."
              className="w-full px-6 py-4 border border-blue-200 rounded-lg text-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors bg-white"
            />
            <svg 
              className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
            <div className="font-semibold text-lg mb-4 text-blue-900">Your Friends</div>
            {data.length > 0 ? (
              <div className="space-y-3">
                {data.map((u, index) => (u.userName != userName ? (
                  <div key={index} className="flex items-center justify-between p-3 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-semibold">
                        {u.firstName ? u.firstName[0].toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">{u.firstName} {u.lastName}</div>
                        <div className="text-sm text-blue-600">{u.userName}</div>
                      </div>
                    </div>
                    <button onClick={()=>{
                      navigate(`/send?id=${u._id}&name=${u.userName}`)
                    }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Send Money
                    </button>
                  </div>
                  ) : (<></>) 
                )
              )}
              </div>
            ) : (
              <div className="text-blue-600">No friends found.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
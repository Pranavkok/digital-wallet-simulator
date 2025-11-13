import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import BetHeader from "../Components/BetHeader";

const BetArena = () => {

  const [balance,setBalance] = useState();
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <header className="bg-green-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1 onClick={()=>{navigate('/dashboard')}} className="text-3xl font-bold">Hello {firstName} {lastName} !</h1>
          <nav className=" flex items-center gap-10">
            <button className="bg-green-500 hover:bg-green-700 p-3 rounded-xl ">Balance : 3000</button>
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
      </header> */}

      <BetHeader/>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-400">Welcome to the Arena</h2>
          <p className="text-lg text-gray-400 mt-2">Place your bets and win big!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for game cards */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Flip 50</h3>
            <p className="text-gray-400">One roll. Double or nothing</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">XYZ</h3>
            <p className="text-gray-400">Place your bets soon here !</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">XYZ</h3>
            <p className="text-gray-400">Place your bets soon here !</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">XYZ</h3>
            <p className="text-gray-400">Place your bets soon here !</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">XYZ</h3>
            <p className="text-gray-400">Place your bets soon here !</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">XYZ</h3>
            <p className="text-gray-400">Place your bets soon here !</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 py-4 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 Blumper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BetArena;
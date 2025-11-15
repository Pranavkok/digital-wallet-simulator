import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Flip50 = () => {

  const [amount , setAmount] = useState();
  const [result ,setResult] = useState(null);
  const [loading,setLoading] = useState(false);
  const [rand , setRand] = useState(0);
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

  const handleChange = async()=>{
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/game/flip`,{
        amount : amount 
      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      const data = response.data ;
      if(data.success){
        setResult(data.result);
        setRand(data.randomNumber)
        fetchBalance()
      }

    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance();
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-400">Flip 50</h2>
          <p className="text-lg text-gray-400 mt-2">Choose Heads or Tails. Double your bet or lose it all.</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center items-center mb-8">
          <div className={`${result == "win" ? "bg-green-400" : ""}
              ${result == "loss" ? "bg-red-400" : ""}
              ${result == null ? "bg-yellow-400" : ""}
              w-48 h-48 rounded-full flex justify-center items-center text-4xl font-bold text-gray-800`
              }>
            {result}
          </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-xl text-gray-400">Random generated value is {rand}</p>
            <p className="text-xl text-gray-400">Current Bet</p>
            <p className="text-5xl font-bold text-white">{amount ? amount : 0}</p>
          </div>

          <div className="flex flex-col gap-4 mb-8 items-center justify-center">
            <input 
              onChange={(e)=>{setAmount(e.target.value)}}
              type="number" 
              className="w-44 sm:w-md px-6 py-3 bg-green-600 border border-white text-white 
                        rounded-lg hover:bg-green-700 transition-colors 
                        text-4xl font-bold text-center"
            />
            {loading &&
              <button 
              className="w-full max-w-xs px-6 py-3 bg-red-600 text-white 
                        rounded-lg hover:bg-red-700 transition-colors 
                        text-2xl font-bold"
            >
              Loading ...
            </button>}
            {!loading &&
              <button 
              onClick={handleChange}
              className="w-full max-w-xs px-6 py-3 bg-red-600 text-white 
                        rounded-lg hover:bg-red-700 transition-colors 
                        text-2xl font-bold"
            >
              BET
            </button>}
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

export default Flip50;

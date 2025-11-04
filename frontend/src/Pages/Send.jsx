import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Send() {
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const to = searchParams.get('id');
  const name = searchParams.get('name');


  const handleSend = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("http://localhost:3000/api/v1/acc/transfer",{
        to , amount
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(response.data.success){
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
      }
      navigate('/dashboard')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-blue-200 rounded-lg p-8 shadow-sm bg-white">
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-900">Send Money</h1>
        
        <div className="mb-6 flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white grid place-items-center font-semibold text-lg">
            {name[0]}
          </div>
          <div>
            <div className="font-medium text-blue-900">{name}</div>
            <div className="text-sm text-blue-600">Recipient</div>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-blue-900">Amount (₹)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" 
              placeholder="0.00" 
            />
          </div>
          
          <button 
            onClick={handleSend}
            type="button" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition-colors"
          >
            Send Money
          </button>
        </form>
      </div>
    </div>
  )
}

export default Send
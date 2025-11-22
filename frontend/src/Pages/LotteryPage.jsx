import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LotteryPage = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState(false);
  const [balance, setBalance] = useState(0);
  const [firstWinnerName,setFirstWinnerName] = useState("");
  const [secondWinnerName,setSecondWinnerName] = useState("");
  const [thirdWinnerName,setThirdWinnerName] = useState("");
  const [isPurchased , setIsPurchased] = useState(false);

  const navigate = useNavigate();

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/acc/balance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setUserName(response.data.user.userName);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWinners = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/game/fetch-today-winners`)

        const data = response.data ;

        if(response.data.success){
            setFirstWinnerName(data.firstWinner.userName);
            setSecondWinnerName(data.secondWinner.userName);
            setThirdWinnerName(data.thirdWinner.userName);
        }
    } catch (error) {
        console.log("No winners found for today yet: " + error.message);
    }
  }

  const findIsPurchased = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/game/isLotteryBuyed`, null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })

        if(response.data.success){
            setIsPurchased(response.data.isBuy);
        }
    } catch (error) {
        console.log("error occured while fetching isPurchased" + error.message);
    }
  }

  const buyTicket = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/v1/game/lottery`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.success){
            alert(response.data.message);
        }
        // setIsPurchased(true);
    } catch (error) {
        console.log(error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);

    if (token) {
      fetchProfile();
      fetchBalance();
      fetchWinners();
      findIsPurchased();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-green-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1
            onClick={() => {
              navigate("/betting-arena");
            }}
            className="text-3xl font-bold cursor-pointer"
          >
            Hello {firstName} {lastName} !
          </h1>

          <nav className="flex items-center gap-10">
            <button className="bg-green-500 hover:bg-green-700 p-3 rounded-xl">
              Balance : ₹{balance.toFixed(2)}
            </button>

            <div className="flex items-center justify-center flex-row gap-5">
              {login && (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className="w-20 h-10 rounded bg-green-500 text-white grid place-items-center text-sm font-bold hover:bg-green-700 transition-colors"
                >
                  Log Out
                </button>
              )}

              {!login && (
                <button
                  onClick={() => {
                    navigate("/signin");
                  }}
                  className="w-20 h-10 rounded bg-green-500 text-white grid place-items-center text-sm font-bold hover:bg-green-700 transition-colors"
                >
                  Log In
                </button>
              )}

              <button
                onClick={() => navigate("/dashboard")}
                className="w-10 h-10 rounded-full bg-green-700 text-white grid place-items-center text-sm font-bold hover:bg-green-900 transition-colors"
              >
                {userName ? userName[0].toUpperCase() : "U"}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-green-500 text-center mb-4">
          Daily Lottery
        </h1>

        <p className="text-lg text-gray-400 text-center mb-12">
          Try your luck and win amazing prizes!
        </p>

        <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-12 tracking-wide bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Today's Winners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* 2nd Place */}
            <div
              className="winner-card bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 border-4 border-green-300/50 float-animation"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-7xl font-bold mb-4 text-white drop-shadow-lg">
                2
              </div>
              <div className="text-2xl mb-3 opacity-90">🥈</div>
              <div className="text-4xl font-bold text-white tracking-wider">
                {secondWinnerName || "None"}
              </div>
              <div className="mt-4 text-sm font-semibold text-green-100 uppercase tracking-widest">
                Silver
              </div>
            </div>

            {/* 1st Place */}
            <div className="winner-card bg-gradient-to-br from-yellow-400 via-green-500 to-green-600 rounded-3xl p-8 text-center transform hover:scale-110 transition-all duration-300 border-4 border-yellow-300/70 glow-animation md:-mt-4">
              <div className="text-5xl mb-2">👑</div>
              <div className="text-8xl font-bold mb-4 text-white drop-shadow-2xl animate-pulse">
                1
              </div>
              <div className="text-3xl mb-3">🏆</div>
              <div className="text-5xl font-bold text-white tracking-wider drop-shadow-lg">
                {firstWinnerName || "None"}
              </div>
              <div className="mt-4 text-base font-bold text-yellow-100 uppercase tracking-widest bg-yellow-600/30 rounded-full px-4 py-1 inline-block">
                Champion
              </div>
            </div>

            {/* 3rd Place */}
            <div
              className="winner-card bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 border-4 border-green-400/50 float-animation"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-7xl font-bold mb-4 text-white drop-shadow-lg">
                3
              </div>
              <div className="text-2xl mb-3 opacity-90">🥉</div>
              <div className="text-4xl font-bold text-white tracking-wider">
                {thirdWinnerName || "None"}
              </div>
              <div className="mt-4 text-sm font-semibold text-green-100 uppercase tracking-widest">
                Bronze
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1"></div>
            <span className="text-2xl animate-pulse">✨</span>
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1"></div>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-300 mb-6 font-medium">
              🎫 Entry Price:{" "}
              <span className="text-green-400 font-bold text-2xl">
                500 coins
              </span>
            </p>
              {
                isPurchased && <button className="bg-red-500 hover:bg-red-600 text-white text-3xl font-bold py-5 px-20 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95 transform">
                Already Purchased 
              </button>
              }
              {
                !isPurchased && <button onClick={buyTicket} className="bg-green-500 hover:bg-green-600 text-white text-3xl font-bold py-5 px-20 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95 transform">
                BUY NOW
              </button>
              }

            <p className="mt-6 text-sm text-gray-400 italic">
              🍀 Good luck on your next draw!
            </p>
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

export default LotteryPage;

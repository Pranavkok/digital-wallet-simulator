import BetHeader from "../Components/BetHeader";

const Flip50 = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <BetHeader />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-400">Flip 50</h2>
          <p className="text-lg text-gray-400 mt-2">Choose Heads or Tails. Double your bet or lose it all.</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center items-center mb-8">
            {/* Placeholder for the coin */}
            <div className="w-48 h-48 rounded-full bg-yellow-400 flex justify-center items-center text-4xl font-bold text-gray-800">
              ?
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-xl text-gray-400">Current Bet</p>
            <p className="text-5xl font-bold text-white">$50.00</p>
          </div>

          <div className="flex flex-col gap-4 mb-8 items-center justify-center">
            <input 
              type="number" 
              className="w-44 sm:w-md px-6 py-3 bg-green-600 border border-white text-white 
                        rounded-lg hover:bg-green-700 transition-colors 
                        text-4xl font-bold text-center"
            />
            <button 
              className="w-full max-w-xs px-6 py-3 bg-red-600 text-white 
                        rounded-lg hover:bg-red-700 transition-colors 
                        text-2xl font-bold"
            >
              BET
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

export default Flip50;

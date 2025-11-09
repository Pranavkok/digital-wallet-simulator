

const BetArena = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-green-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Betting Arena</h1>
          <nav className=" flex items-center gap-10">
            <button className="bg-green-500 p-3 rounded-xl ">Balance : 3000</button>
            <ul className="hidden space-x-6 md:flex">
              <li><a href="#" className="hover:text-green-300">Slots</a></li>
              <li><a href="#" className="hover:text-green-300">Table Games</a></li>
              <li><a href="#" className="hover:text-green-300">Promotions</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-400">Welcome to the Arena</h2>
          <p className="text-lg text-gray-400 mt-2">Place your bets and win big!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for game cards */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Live Blackjack</h3>
            <p className="text-gray-400">Join a live table with our professional dealers.</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Slot Machines</h3>
            <p className="text-gray-400">Spin the reels and try your luck on our exciting slots.</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Spin Now
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Roulette</h3>
            <p className="text-gray-400">Place your bets on your lucky numbers.</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Play Now
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 py-4 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 Betting Arena. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BetArena;
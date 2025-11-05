import { useNavigate } from 'react-router-dom';

const Land = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">PayApp</div>
          <div>
            <button
              onClick={() => navigate('/signin')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
            <header
        className="text-white py-20 text-center bg-cover bg-center bg-blue-700"
        // style={{ backgroundImage: "url('https://lh3.googleusercontent.com/gg/AIJ2gl8xQgs0Vv_U7R_v-Vb96AZ_F3Ss1EIg8z35-mkzDo_E_H-mcEw2724svT86g2urjHdJ2VwpTuFKLKQvIPJxEdcaZTNo35Rn086069x1hN58KU1jHHoEg39NAKLwhvTTnZ4SwvyBZzibvaPo_RhGLZPMtY9071is9u8F-dJ46w14YfaFeGqmnuq0g8wWJtii1F8L3nMxBpfK8gy3vtCOWuppCBBJOxVZqNJ6XUtijh73zbCqev9MmFPMAojPGYlr6YwIbdyuZGfreE1tCp9RoZswR7J8Qf9r7m74U9hNGgymRdv4-1qEtv0S8mXdHLpxQlkoCPBmrrYDdr-otae-ZVo=s1024-rj')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Seamless, Secure, and Swift Payments for Everyone</h1>
          <p className="text-xl mb-8">
            Experience the future of digital transactions. Our platform offers a fast, reliable, and secure way to manage your finances, whether you're paying bills, sending money to friends, or shopping online.
          </p>

        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose PayApp?</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Instant Transfers</h3>
                <p className="text-gray-600">Send and receive money in seconds. No more waiting for days for transactions to clear.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Secure Transactions</h3>
                <p className="text-gray-600">Your security is our priority. We use state-of-the-art encryption to protect your data.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
                <p className="text-gray-600">Our support team is available around the clock to assist you with any issues.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 PayApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Land;

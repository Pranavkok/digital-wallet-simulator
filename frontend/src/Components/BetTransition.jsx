import { useNavigate } from 'react-router-dom'

const BetTransition = () => {

    const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bottom'>
      <video autoPlay onEnded={()=>{
        navigate('/betting-arena')
      }} className='w-full h-full object-cover' src="BetTransition.mp4"></video>
      <button
        onClick={() => navigate('/betting-arena')}
        className="w-xl h-10 absolute bottom-6 right-8 z-10 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-all duration-200"
      >
        Skip
      </button>
    </div>
  )
}

export default BetTransition

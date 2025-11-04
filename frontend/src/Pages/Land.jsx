import { useNavigate } from 'react-router-dom'

const Land = () => {
    const navigate = useNavigate();
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div>
        <button onClick={()=>{
            navigate('/signin')
        }}>Login</button>
        <button onClick={()=>{
            navigate('/signup')
        }}>Register</button>
      </div>
    </div>
  )
}

export default Land

import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {
  getInfo,
  getProposals,
  isWallectConnected,
} from './Blockchain.services'
import Header from './components/Header'
import Home from './views/Home'
import Proposal from './views/Proposal'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await isWallectConnected()
     getInfo()
     getProposals()
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      <Header />
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal/:id" element={<Proposal />} />
        </Routes>
      ) : null}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App

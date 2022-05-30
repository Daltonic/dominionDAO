import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { loadWeb3 } from './Dominion'
import { ToastContainer } from 'react-toastify';
import Home from './views/Home'
import Proposal from './views/Proposal'
import 'react-toastify/dist/ReactToastify.min.css'
import { isUserLoggedIn } from './CometChat';
import { setGlobalState } from './store';

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    loadWeb3().then((res) => {
      if (res) setLoaded(true)
    })
    isUserLoggedIn().then(user => {
      // setGlobalState('currentUser', user)
      console.log(user, "first")
    })
    // console.log(isUserLoggedIn())
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="proposal/:id" element={<Proposal />} />
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

import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Proposal from './views/Proposal'

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="proposal/:id" element={<Proposal />} />
      </Routes>
    </div>
  )
}

export default App

import Banner from './components/Banner'
import CreateDAO from './components/CreateDAO'
import Header from './components/Header'
import Proposals from './components/Proposals'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner />
      <Proposals />
      <CreateDAO />
    </div>
  )
}

export default App

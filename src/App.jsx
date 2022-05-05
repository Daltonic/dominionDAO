import Banner from './components/Banner'
import Header from './components/Header'
import Proposals from './components/Proposals'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner />
      <Proposals />
    </div>
  )
}

export default App

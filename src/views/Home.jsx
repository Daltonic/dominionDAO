import Banner from '../components/Banner'
import ChatLogin from '../components/ChatLogin'
import CreateProposal from '../components/CreateProposal'
import Header from '../components/Header'
import Proposals from '../components/Proposals'

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Proposals />
      <CreateProposal />
      <ChatLogin />
    </>
  )
}

export default Home

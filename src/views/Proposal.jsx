import ChatLogin from '../components/ChatLogin'
import Header from '../components/Header'
import ProposalDetails from '../components/ProposalDetails'
import Voters from '../components/Voters'

const Proposal = () => {
  return (
    <>
      <Header />
      <ProposalDetails />
      <Voters />
      <ChatLogin />
    </>
  )
}

export default Proposal

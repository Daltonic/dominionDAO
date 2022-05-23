import Web3 from 'web3'
import {
  setAlert,
  setGlobalState,
  getGlobalState,
  setLoadingMsg,
} from './store'
import DominionDAO from './abis/DominionDAO.json'

const { ethereum } = window

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    console.log(JSON.stringify(error))
    // setAlert(JSON.stringify(error), 'red')
  }
}

const raiseProposal = async ({ title, description, beneficiary, amount }) => {
  try {
    amount = window.web3.utils.toWei(amount.toString(), 'ether')
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    await contract.methods
      .createProposal(title, description, beneficiary, amount)
      .send({ from: account })

    return true
  } catch (error) {
    console.log(error.message)
  }
}

const performContribute = async (amount) => {
  try {
    amount = window.web3.utils.toWei(amount.toString(), 'ether')
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    await contract.methods.contribute().send({ from: account, value: amount })

    return true
  } catch (error) {
    console.log(error.message)
  }
}

const retrieveProposal = async (proposalId) => {
  const web3 = window.web3
  try {
    const contract = getGlobalState('contract')
    const proposal = await contract.methods.getProposal(proposalId).call()
    return {
      id: proposal.id,
      amount: web3.utils.fromWei(proposal.amount),
      title: proposal.title,
      description: proposal.description,
      paid: proposal.paid,
      passed: proposal.passed,
      proposer: proposal.proposer,
      upvotes: Number(proposal.upvotes),
      downvotes: Number(proposal.downvotes),
      beneficiary: proposal.beneficiary,
      executor: proposal.executor,
      duration: proposal.duration,
    }
  } catch (error) {
    console.log(error)
  }
}

const loadWeb3 = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    window.web3 = new Web3(ethereum)
    await ethereum.request({ method: 'eth_requestAccounts' })
    window.web3 = new Web3(window.web3.currentProvider)

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setGlobalState('connectedAccount', accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = DominionDAO.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(
        DominionDAO.abi,
        networkData.address
      )
      const isStakeholder = await contract.methods
        .isStakeholder()
        .call({ from: accounts[0] })
      const proposals = await contract.methods.getProposals().call()

      setGlobalState('isStakeholder', isStakeholder)
      setGlobalState('proposals', structuredProposals(proposals))
      setGlobalState('contract', contract)
    } else {
      window.alert('DominionDAO contract not deployed to detected network.')
    }
  } catch (error) {
    alert('Please connect your metamask wallet!')
  }
}

const structuredProposals = (proposals) => {
  const web3 = window.web3
  return proposals
    .map((proposal) => ({
      id: proposal.id,
      amount: web3.utils.fromWei(proposal.amount),
      title: proposal.title,
      description: proposal.description,
      paid: proposal.paid,
      passed: proposal.passed,
      proposer: proposal.proposer,
      upvotes: Number(proposal.upvotes),
      downvotes: Number(proposal.downvotes),
      beneficiary: proposal.beneficiary,
      executor: proposal.executor,
      duration: proposal.duration,
    }))
    .reverse()
}

export {
  loadWeb3,
  connectWallet,
  performContribute,
  raiseProposal,
  retrieveProposal,
}
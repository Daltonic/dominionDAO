import Web3 from 'web3'
import { setGlobalState, getGlobalState } from './store'
import abi from './abis/DominionDAO.json'

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0].toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = await abi.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address)
      return contract
    } else {
      return null
    }
  } else {
    return getGlobalState('contract')
  }
}

const performContribute = async (amount) => {
  try {
    amount = window.web3.utils.toWei(amount.toString(), 'ether')
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')

    await contract.methods.contribute().send({ from: account, value: amount })

    window.location.reload()
  } catch (error) {
    reportError(error)
    return error
  }
}

const getInfo = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const connectedAccount = getGlobalState('connectedAccount')
    const isStakeholder = await contract.methods
      .isStakeholder()
      .call({ from: connectedAccount })
    const balance = await contract.methods.daoBalance().call()
    const mybalance = await contract.methods
      .getBalance()
      .call({ from: connectedAccount })
    setGlobalState('balance', window.web3.utils.fromWei(balance))
    setGlobalState('mybalance', window.web3.utils.fromWei(mybalance))
    setGlobalState('isStakeholder', isStakeholder)
  } catch (error) {
    reportError(error)
  }
}

const raiseProposal = async ({ title, description, beneficiary, amount }) => {
  try {
    amount = window.web3.utils.toWei(amount.toString(), 'ether')
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')

    await contract.methods
      .createProposal(title, description, beneficiary, amount)
      .send({ from: account })

    window.location.reload()
  } catch (error) {
    reportError(error)
    return error
  }
}

const getProposals = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const proposals = await contract.methods.getProposals().call()
    setGlobalState('proposals', structuredProposals(proposals))
  } catch (error) {
    reportError(error)
  }
}

const structuredProposals = (proposals) => {
  return proposals
    .map((proposal) => ({
      id: proposal.id,
      amount: window.web3.utils.fromWei(proposal.amount),
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

const getProposal = async (id) => {
  try {
    const proposals = getGlobalState('proposals')
    return proposals.find((proposal) => proposal.id == id)
  } catch (error) {
    reportError(error)
  }
}

const voteOnProposal = async (proposalId, supported) => {
  try {
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    await contract.methods
      .performVote(proposalId, supported)
      .send({ from: account })

    window.location.reload()
  } catch (error) {
    reportError(error)
  }
}

const listVoters = async (id) => {
  try {
    const contract = await getEtheriumContract()
    const votes = await contract.methods.getVotesOf(id).call()
    return votes
  } catch (error) {
    reportError(error)
  }
}

const payoutBeneficiary = async (id) => {
  try {
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    await contract.methods.payBeneficiary(id).send({ from: account })
    window.location.reload()
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  console.log(JSON.stringify(error), 'red')
  throw new Error('No ethereum object.')
}

export {
  isWallectConnected,
  connectWallet,
  performContribute,
  getInfo,
  raiseProposal,
  getProposals,
  getProposal,
  voteOnProposal,
  listVoters,
  payoutBeneficiary
}

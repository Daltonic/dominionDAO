import Web3 from 'web3'
import { setGlobalState, getGlobalState } from './store'
import DominionDAO from './abis/DominionDAO.json'

const { ethereum } = window

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}

const raiseProposal = async ({ title, description, beneficiary, amount }) => {
  try {
    amount = window.web3.utils.toWei(amount.toString(), 'ether')
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    let proposal = await contract.methods
      .createProposal(title, description, beneficiary, amount)
      .send({ from: account })

    return proposal
  } catch (error) {
    console.log(error.message)
    return error
  }
}

const performContribute = async (amount) => {
  try {
    amount = window.web3.utils.toWei(amount.toString(), 'ether')
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    let balance = await contract.methods
      .contribute()
      .send({ from: account, value: amount })
    balance = window.web3.utils.fromWei(
      balance.events.Action.returnValues.amount
    )
    return balance
  } catch (error) {
    console.log(error.message)
    return error
  }
}

const retrieveProposal = async (id) => {
  const web3 = window.web3
  try {
    const contract = getGlobalState('contract')
    const proposal = await contract.methods.getProposal(id).call().wait()
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

const reconstructProposal = (proposal) => {
  return {
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
  }
}

const getProposal = async (id) => {
  try {
    const proposals = getGlobalState('proposals')
    return proposals.find((proposal) => proposal.id == id)
  } catch (error) {
    console.log(error)
  }
}

const voteOnProposal = async (proposalId, supported) => {
  try {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')
    const vote = await contract.methods
      .performVote(proposalId, supported)
      .send({ from: account })
    return vote
  } catch (error) {
    console.log(error)
    return error
  }
}

const listVoters = async (id) => {
  try {
    const contract = getGlobalState('contract')
    const votes = await contract.methods.getVotesOf(id).call()
    return votes
  } catch (error) {
    console.log(error)
  }
}

const payoutBeneficiary = async (id) => {
  try {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')
    const balance = await contract.methods
      .payBeneficiary(id)
      .send({ from: account })
    return balance
  } catch (error) {
    return error
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
      const balance = await contract.methods.daoBalance().call()
      const mybalance = await contract.methods
        .getBalance()
        .call({ from: accounts[0] })

      setGlobalState('contract', contract)
      setGlobalState('balance', web3.utils.fromWei(balance))
      setGlobalState('mybalance', web3.utils.fromWei(mybalance))
      setGlobalState('isStakeholder', isStakeholder)
      setGlobalState('proposals', structuredProposals(proposals))
    } else {
      window.alert('DominionDAO contract not deployed to detected network.')
    }
    return true
  } catch (error) {
    alert('Please connect your metamask wallet!')
    console.log(error)
    return false
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
  voteOnProposal,
  getProposal,
  listVoters,
  payoutBeneficiary,
}

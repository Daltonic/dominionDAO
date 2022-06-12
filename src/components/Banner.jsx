import { useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'
import { performContribute } from '../Dominion'
import { toast } from 'react-toastify'

const Banner = () => {
  const [isStakeholder] = useGlobalState('isStakeholder')
  const [proposals] = useGlobalState('proposals')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [currentUser] = useGlobalState('currentUser')
  const [balance] = useGlobalState('balance')
  const [mybalance] = useGlobalState('mybalance')
  const [amount, setAmount] = useState('')

  const onPropose = () => {
    if (!isStakeholder) return
    setGlobalState('createModal', 'scale-100')
  }

  const onContribute = () => {
    if (!!!amount || amount == '') return
    toast.info('Contribution in progress...')

    performContribute(amount).then((bal) => {
      if (!!!bal.message) {
        setGlobalState('balance', Number(balance) + Number(bal))
        setGlobalState('mybalance', Number(mybalance) + Number(bal))
        setAmount('')
        toast.success('Contribution received')
      }
    })
  }

  const opened = () => proposals.filter((proposal) => !proposal.passed).length

  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">
        {opened()} Proposal{opened() == 1 ? '' : 's'} Currenly Opened
      </h2>
      <p>
        Current DAO Balance: <strong>{balance} Eth</strong> <br />
        Your contributions:{' '}
        <span>
          <strong>{mybalance} Eth</strong>
          {isStakeholder ? ', and you are now a stakeholder 😊' : null}
        </span>
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>
        {isStakeholder
          ? 'You can now raise proposals on this platform 😆'
          : 'Hey, when you contribute upto 1 ether you become a stakeholder 😎'}
      </p>
      <div className="flex flex-row justify-start items-center md:w-1/3 w-full mt-4">
        <input
          type="number"
          className="form-control block w-full px-3 py-1.5
          text-base font-normaltext-gray-700
          bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 shadow-md
          focus:text-gray-500 focus:outline-none
          dark:border-gray-500 dark:bg-transparent"
          placeholder="e.g 2.5 Eth"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          required
        />
      </div>
      <div
        className="flex flex-row justify-start items-center space-x-3 mt-4"
        role="group"
      >
        <button
          type="button"
          className={`inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase shadow-md rounded-full
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out dark:text-blue-500
          dark:border dark:border-blue-500 dark:bg-transparent`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={onContribute}
        >
          Contribute
        </button>

        {isStakeholder ? (
          <button
            type="button"
            className={`inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase shadow-md rounded-full
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out dark:text-blue-500
            dark:border dark:border-blue-500 dark:bg-transparent`}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={onPropose}
          >
            Propose
          </button>
        ) : null}
        {currentUser &&
        currentUser.uid == connectedAccount.toLowerCase() ? null : (
          <button
            type="button"
            className={`inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase shadow-md rounded-full
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out dark:border dark:border-blue-500`}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={() => setGlobalState('loginModal', 'scale-100')}
          >
            Login Chat
          </button>
        )}
      </div>
    </div>
  )
}

export default Banner

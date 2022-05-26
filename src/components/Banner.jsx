import { useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'
import { performContribute } from '../Dominion'

const Banner = () => {
  const [isStakeholder] = useGlobalState('isStakeholder')
  const [proposals] = useGlobalState('proposals')
  const [balance] = useGlobalState('balance')
  const [amount, setAmount] = useState('')

  const onPropose = () => {
    if (!isStakeholder) return
    setGlobalState('createModal', 'scale-100')
  }

  const onContribute = () => {
    if (!!!amount || amount == '') return
    performContribute(amount).then((res) => {
      if (res) window.location.reload()
    })
  }

  const opened = () => proposals.filter((proposal) => !proposal.passed).length

  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">
        {opened()} Proposal{opened() == 1 ? '' : 's'} Currenly Opened
      </h2>
      <p>
        Current DAO Balance: <span className="font-bold">{balance} Eth</span>
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>
        This is a build one out of many <span className="font-bold">DAO</span>{' '}
        applications scheduled to show up on this platform.
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
        className="flex flex-row justify-start items-center mt-4"
        role="group"
      >
        <button
          type="button"
          className={`inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase shadow-md
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out dark:text-blue-500
          dark:border dark:border-blue-500 dark:bg-transparent
          ${!isStakeholder ? 'rounded-full' : 'rounded-l-full'}`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={onContribute}
        >
          Contribute
        </button>
        {isStakeholder ? (
          <button
            type="button"
            className="inline-block px-6 py-2.5
            bg-blue-600 font-medium text-xs
            leading-tight uppercase rounded-r-full shadow-md
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out dark:text-blue-500
            dark:border dark:border-blue-500 dark:bg-transparent"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={onPropose}
          >
            Propose
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Banner

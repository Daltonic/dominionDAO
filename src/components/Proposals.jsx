import Identicon from 'react-identicons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { truncate, useGlobalState, daysRemaining } from '../store'
import { payoutBeneficiary } from '../Dominion'
import { toast } from 'react-toastify'

const Proposals = () => {
  const [data] = useGlobalState('proposals')
  const [proposals, setProposals] = useState(data)

  const deactive = `bg-transparent
  text-blue-600 font-medium text-xs leading-tight
  uppercase hover:bg-blue-700 focus:bg-blue-700
  focus:outline-none focus:ring-0 active:bg-blue-600
  transition duration-150 ease-in-out overflow-hidden
  border border-blue-600 hover:text-white focus:text-white`

  const active = `bg-blue-600
  text-white font-medium text-xs leading-tight
  uppercase hover:bg-blue-700 focus:bg-blue-700
  focus:outline-none focus:ring-0 active:bg-blue-800
  transition duration-150 ease-in-out overflow-hidden
  border border-blue-600`

  const getAll = () => setProposals(data)

  const getOpened = () =>
    setProposals(data.filter((proposal) => new Date().getTime() <
    Number(proposal.duration + '000')))

  const getClosed = () =>
    setProposals(data.filter((proposal) =>new Date().getTime() >
    Number(proposal.duration + '000')))

  const handlePayout = (id) => {
    payoutBeneficiary(id).then((res) => {
      if (!!!res.code) {
        toast.success('Beneficiary successfully Paid Out!')
        window.location.reload()
      }
    })
  }

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row justify-center items-center" role="group">
        <button
          aria-current="page"
          className={`rounded-l-full px-6 py-2.5 ${active}`}
          onClick={getAll}
        >
          All
        </button>
        <button
          aria-current="page"
          className={`px-6 py-2.5 ${deactive}`}
          onClick={getOpened}
        >
          Open
        </button>
        <button
          aria-current="page"
          className={`rounded-r-full px-6 py-2.5 ${deactive}`}
          onClick={getClosed}
        >
          Closed
        </button>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Expires
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr
                    key={proposal.id}
                    className="border-b dark:border-gray-500"
                  >
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <Identicon
                          string={proposal.proposer.toLowerCase()}
                          size={25}
                          className="h-10 w-10 object-contain rounded-full mr-3"
                        />
                        <span>{truncate(proposal.proposer, 4, 4, 11)}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {proposal.title.substring(0, 80) + '...'}
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {new Date().getTime() >
                      Number(proposal.duration + '000') ? 'Expired' : daysRemaining(proposal.duration)}
                    </td>
                    <td
                      className="flex justify-start items-center space-x-3
                      text-sm font-light px-6 py-4 whitespace-nowrap"
                    >
                      <Link
                        to={'/proposal/' + proposal.id}
                        className="dark:border rounded-full px-6 py-2.5 dark:border-blue-600
                          dark:text-blue-600 dark:bg-transparent font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out text-white bg-blue-600"
                      >
                        View
                      </Link>

                      {new Date().getTime() >
                      Number(proposal.duration + '000') ? (
                        !proposal.paid ? (
                          <button
                            className="dark:border rounded-full px-6 py-2.5 dark:border-red-600
                            dark:text-red-600 dark:bg-transparent font-medium text-xs leading-tight
                            uppercase hover:border-red-700 focus:border-red-700
                            focus:outline-none focus:ring-0 active:border-red-800
                            transition duration-150 ease-in-out text-white bg-red-600"
                            onClick={() => handlePayout(proposal.id)}
                          >
                            Payout
                          </button>
                        ) : (
                          <button
                            className="dark:border rounded-full px-6 py-2.5 dark:border-green-600
                              dark:text-green-600 dark:bg-transparent font-medium text-xs leading-tight
                              uppercase hover:border-green-700 focus:border-green-700
                              focus:outline-none focus:ring-0 active:border-green-800
                              transition duration-150 ease-in-out text-white bg-green-600"
                          >
                            Paid
                          </button>
                        )
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposals

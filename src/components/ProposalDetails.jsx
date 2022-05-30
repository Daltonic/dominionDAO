import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setGlobalState } from '../store'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts'
import { getProposal, voteOnProposal } from '../Dominion'
import { useGlobalState } from '../store'

const ProposalDetails = () => {
  const { id } = useParams()
  const [proposal, setProposal] = useState(null)
  const [data, setData] = useState([])
  const [isStakeholder] = useGlobalState('isStakeholder')

  useEffect(() => {
    getProposal(id).then((res) => {
      setProposal(res)
      setData([
        {
          name: 'Voters',
          Acceptees: res?.upvotes,
          Rejectees: res?.downvotes,
        },
      ])
    })
  }, [id])

  const onVote = (choice) => {
    voteOnProposal(id, choice)
      .then((res) => {
        if (res) {
          toast.success('Voted successfully!')
          window.location.reload()
        }
      })
      .catch((error) => toast.error(error.message))
  }

  const daysRemaining = (days) => {
    const todaysdate = moment()
    days = Number((days + '000').slice(0))
    days = moment(days).format('YYYY-MM-DD')
    days = moment(days)
    days = days.diff(todaysdate, 'days')
    return days == 1 ? '1 day' : days + ' days'
  }

  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">{proposal?.title}</h2>
      <p>
        This proposal is to payout <strong>{proposal?.amount} Eth</strong> and
        currently have{' '}
        <strong>{proposal?.upvotes + proposal?.downvotes} votes</strong> and
        will expire in <strong>{daysRemaining(proposal?.duration)}</strong>
      </p>
      <hr className="my-6 border-gray-300" />
      <p>{proposal?.description}</p>
      <div className="flex flex-row justify-start items-center w-full mt-4 overflow-auto">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Acceptees" fill="#2563eb" />
          <Bar dataKey="Rejectees" fill="#dc2626" />
        </BarChart>
      </div>
      {isStakeholder ? (
        <div
          className="flex flex-row justify-start items-center mt-4"
          role="group"
        >
          <button
            type="button"
            className="inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded-l-full shadow-md
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out dark:text-gray-300
          dark:border dark:border-gray-500 dark:bg-transparent"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={() => onVote(true)}
          >
            Accept
          </button>
          <button
            type="button"
            className="inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase shadow-md
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out
          dark:border dark:border-gray-500 dark:bg-transparent"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={() => onVote(false)}
          >
            Reject
          </button>
          <button
            type="button"
            className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase rounded-r-full shadow-md
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out
            dark:border dark:border-blue-500"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={() => setGlobalState('loginModal', 'scale-100')}
          >
            Chat
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ProposalDetails

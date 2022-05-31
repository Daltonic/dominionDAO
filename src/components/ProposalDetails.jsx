import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getGroup, createNewGroup, joinGroup } from '../CometChat'
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
  const navigator = useNavigate()
  const [proposal, setProposal] = useState(null)
  const [group, setGroup] = useState(null)
  const [data, setData] = useState([])
  const [isStakeholder] = useGlobalState('isStakeholder')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [currentUser] = useGlobalState('currentUser')

  useEffect(() => {
    retrieveProposal()
    getGroup(`pid_${id}`).then((group) => {
      if (!!!group.code) setGroup(group)
      console.log(group)
    })
  }, [id])

  const retrieveProposal = () => {
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
  }

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

  const onEnterChat = () => {
    if (group.hasJoined) {
      navigator(`/chat/${`pid_${id}`}`)
    } else {
      joinGroup(`pid_${id}`).then((res) => {
        if (!!res) {
          navigator(`/chat/${`pid_${id}`}`)
          console.log('Success joining: ', res)
        } else {
          console.log('Error Joining Group: ', res)
        }
      })
    }
  }

  const onCreateGroup = () => {
    createNewGroup(`pid_${id}`, proposal.title).then((group) => {
      if (!!!group.code) {
        toast.success('Group created successfully!')
        setGroup(group)
      } else {
        console.log('Error Creating Group: ', group)
      }
    })
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
          className="flex flex-row justify-start items-center space-x-3 mt-4"
          role="group"
        >
          <button
            type="button"
            className="inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase rounded-full shadow-md
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
            leading-tight uppercase rounded-full shadow-md
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
          {currentUser &&
          currentUser.uid == connectedAccount.toLowerCase() &&
          group?.hasJoined ? (
            <button
              type="button"
              className="inline-block px-6 py-2.5
                bg-blue-600 text-white font-medium text-xs
                leading-tight uppercase rounded-full shadow-md
                hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg transition
                duration-150 ease-in-out
                dark:border dark:border-blue-500"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={onEnterChat}
            >
              Chat
            </button>
          ) : null}

          {proposal?.proposer.toLowerCase() == connectedAccount.toLowerCase() &&
          !!group?.code ? (
            <button
              type="button"
              className="inline-block px-6 py-2.5
                bg-blue-600 text-white font-medium text-xs
                leading-tight uppercase rounded-full shadow-md
                hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg transition
                duration-150 ease-in-out
                dark:border dark:border-blue-500"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={onCreateGroup}
            >
              Create Group
            </button>
          ) : null}

          {proposal?.proposer.toLowerCase() != connectedAccount.toLowerCase() &&
            !!!group ? (
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600
                dark:bg-transparent text-white font-medium text-xs
                leading-tight uppercase rounded-full shadow-md
                hover:border-blue-700 hover:shadow-lg focus:border-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0
                active:border-blue-800 active:shadow-lg transition
                duration-150 ease-in-out dark:text-blue-500
                dark:border dark:border-blue-500 disabled:bg-blue-300"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                disabled
              >
                Group N/A
              </button>
            ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default ProposalDetails

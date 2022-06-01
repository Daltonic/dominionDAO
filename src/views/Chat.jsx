import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getGroup } from '../CometChat'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Messages from '../components/Messages'

const Chat = () => {
  const { gid } = useParams()
  const navigator = useNavigate()
  const [group, setGroup] = useState(null)

  useEffect(() => {
    getGroup(gid).then((group) => {
      if (!!!group.code) {
        setGroup(group)
      } else {
        toast.warning('Please join the group first!')
        navigator(`/proposal/${gid.substr(4)}`)
      }
    })
  }, [gid])

  return (
    <>
      <Header />
      <Messages gid={gid} />
    </>
  )
}

export default Chat

import { useParams } from 'react-router-dom'
import Header from '../components/Header'

const Chat = () => {
  const { gid } = useParams()

  return (
    <>
      <Header />
      <h4>Welcome to group {gid}</h4>
    </>
  )
}

export default Chat

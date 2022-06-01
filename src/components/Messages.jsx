import Identicon from 'react-identicons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { truncate, useGlobalState } from '../store'
import { getMessages, sendMessage, CometChat } from '../CometChat'

const Messages = ({ gid }) => {
  const navigator = useNavigate()
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages(gid).then((msgs) => {
      if (!!!msgs.code)
        setMessages(msgs.filter((msg) => msg.category == 'message'))
    })
    listenForMessage(gid)
  }, [gid])

  const listenForMessage = (listenerID) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
          scrollToEnd()
        },
      })
    )
  }

  const handleMessage = (e) => {
    e.preventDefault()
    sendMessage(gid, message).then((msg) => {
      if (!!!msg.code) {
        setMessages((prevState) => [...prevState, msg])
        setMessage('')
        scrollToEnd()
      }
    })
  }

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  const dateToTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  return (
    <div className="p-8">
      <div className="flex flex-row justify-start">
        <button
          className="px-4 py-2.5 bg-transparent hover:text-white
        font-bold text-xs leading-tight uppercase
        rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none
        focus:ring-0 active:bg-blue-800 active:shadow-lg
        transition duration-150 ease-in-out"
        onClick={() => navigator(`/proposal/${gid.substr(4)}`)}
        >
          Exit Chat
        </button>
      </div>

      <div
        id="messages-container"
        className="h-[calc(100vh_-_16rem)] overflow-y-auto sm:pr-4 my-3"
      >
        {messages.map((message, i) =>
          message.sender.uid.toLowerCase() != connectedAccount.toLowerCase() ? (
            <div key={i} className="flex flex-row justify-start my-2">
              <div className="flex flex-col bg-transparent w-80 p-3 px-5 rounded-3xl shadow-md">
                <div className="flex flex-row justify-start items-center space-x-2">
                  <Identicon
                    string={message.sender.uid.toLowerCase()}
                    size={25}
                    className="h-10 w-10 object-contain shadow-md rounded-full mr-3"
                  />
                  <span>@{truncate(message.sender.uid, 4, 4, 11)}</span>
                  <small>{dateToTime(new Date(message.sentAt * 1000))}</small>
                </div>
                <small className="leading-tight my-2">{message.text}</small>
              </div>
            </div>
          ) : (
            <div key={i} className="flex flex-row justify-end my-2">
              <div className="flex flex-col bg-transparent w-80 p-3 px-5 rounded-3xl shadow-md shadow-blue-300">
                <div className="flex flex-row justify-start items-center space-x-2">
                  <Identicon
                    string={connectedAccount.toLowerCase()}
                    size={25}
                    className="h-10 w-10 object-contain shadow-md rounded-full mr-3"
                  />
                  <span>@you</span>
                  <small>{dateToTime(new Date(message.sentAt * 1000))}</small>
                </div>
                <small className="leading-tight my-2">{message.text}</small>
              </div>
            </div>
          )
        )}
      </div>

      <form onSubmit={handleMessage} className="flex flex-row">
        <input
          className="w-full bg-transparent rounded-lg p-4 
          focus:ring-0 focus:outline-none border-gray-500"
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" hidden>
          send
        </button>
      </form>
    </div>
  )
}

export default Messages

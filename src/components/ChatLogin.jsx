import { FaTimes } from 'react-icons/fa'
import { loginWithCometChat, signInWithCometChat } from '../CometChat'
import { setGlobalState, useGlobalState } from '../store'
import { toast } from 'react-toastify'

const ChatLogin = () => {
  const [loginModal] = useGlobalState('loginModal')
  const [connectedAccount] = useGlobalState('connectedAccount')

  const handleSignUp = () => {
    signInWithCometChat(connectedAccount, connectedAccount).then((user) => {
      if (!!!user.code) {
        toast.success('Account created, now click the login button.')
      } else {
        toast.error(user.message)
      }
    })
  }

  const handleLogin = () => {
    loginWithCometChat(connectedAccount).then((user) => {
      if (!!!user.code) {
        setGlobalState('currentUser', user)
        toast.success('Logged in successful!')
        closeModal()
      } else {
        toast.error(user.message)
      }
    })
  }

  const closeModal = () => {
    setGlobalState('loginModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform z-50
      transition-transform duration-300 ${loginModal}`}
    >
      <div className="bg-white dark:bg-[#212936] shadow-xl shadow-[#122643] dark:shadow-gray-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Authenticate</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="my-2 font-light">
            <span>
              Once you login, you will be enabled to chat with other
              stakeholders to make a well-informed voting.
            </span>
          </div>

          <div
            className="flex flex-row justify-between items-center mt-2"
            role="group"
          >
            <button
              className="rounded-lg px-6 py-2.5 bg-blue-600
              text-white font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              className="rounded-lg px-6 py-2.5 bg-transparent
              text-blue-600 font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 hover:text-white focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5
              border-blue-600"
              onClick={handleSignUp}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLogin

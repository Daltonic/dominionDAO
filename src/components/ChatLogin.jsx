import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'

const ChatLogin = () => {
  const [loginModal] = useGlobalState('loginModal')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) return
    console.log({ name, email, password })
  }

  const closeModal = () => {
    setGlobalState('loginModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform z-50
      transition-transform duration-300 ${loginModal}`}
    >
      <div className="bg-white dark:bg-[#212936] shadow-xl shadow-[#122643] dark:shadow-gray-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        {hasAccount ? (
          <form className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <p className="font-semibold">Login</p>
              <button
                type="button"
                onClick={closeModal}
                className="border-0 bg-transparent focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
              <input
                className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
                type="email"
                name="email"
                placeholder="you@domain.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
              <input
                className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
                type="password"
                name="password"
                placeholder="*********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div
              className="flex flex-row justify-between items-center mt-5"
              role="group"
            >
              <button
                className="rounded-lg px-6 py-2.5 bg-blue-600
              text-white font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
                onClick={handleSubmit}
              >
                Login
              </button>

              <button
                className="rounded-lg px-6 py-2.5 bg-transparent
              text-blue-600 font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 hover:text-white focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
              onClick={() => setHasAccount(false)}
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          <form className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <p className="font-semibold">Sign Up</p>
              <button
                type="button"
                onClick={closeModal}
                className="border-0 bg-transparent focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
              <input
                className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            
            <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
              <input
                className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
                type="email"
                name="email"
                placeholder="you@domain.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
              <input
                className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
                type="password"
                name="password"
                placeholder="*********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div
              className="flex flex-row justify-between items-center mt-5"
              role="group"
            >
              <button
                className="rounded-lg px-6 py-2.5 bg-blue-600
              text-white font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
                onClick={handleSubmit}
              >
                Create Account
              </button>

              <button
                className="rounded-lg px-6 py-2.5 bg-transparent
              text-blue-600 font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 hover:text-white focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
              onClick={() => setHasAccount(true)}
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ChatLogin

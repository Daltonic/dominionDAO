import { useState, useEffect } from 'react'
import { FaUserSecret } from 'react-icons/fa'
import { MdLightMode } from 'react-icons/md'
import { FaMoon } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  const [theme, setTheme] = useState(localStorage.theme)
  const themeColor = theme === 'dark' ? 'light' : 'dark'
  const darken = theme === 'dark' ? true : false

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(themeColor)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [themeColor, theme])

  const toggleLight = () => {
    const root = window.document.documentElement
    root.classList.remove(themeColor)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
    setTheme(themeColor)
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-white dark:bg-[#212936]">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="navbar-collapse collapse grow flex flex-row justify-between items-center p-2">
            <Link
              to={'/'}
              className="flex flex-row justify-start items-center space-x-3"
            >
              <FaUserSecret className="cursor-pointer" size={25} />
              <span className="invisible md:visible dark:text-gray-300">
                Dominion
              </span>
            </Link>

            <div className="flex flex-row justify-center items-center space-x-5">
              {darken ? (
                <MdLightMode
                  className="cursor-pointer"
                  size={25}
                  onClick={toggleLight}
                />
              ) : (
                <FaMoon
                  className="cursor-pointer"
                  size={25}
                  onClick={toggleLight}
                />
              )}
              {/* <button
                className="px-4 py-2.5 bg-blue-600 text-white
                font-medium text-xs leading-tight uppercase
                rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none
                focus:ring-0 active:bg-blue-800 active:shadow-lg
                transition duration-150 ease-in-out dark:text-gray-300
                dark:border dark:border-gray-500 dark:bg-transparent"
              >
                {truncate('0x66aEEbA2C8255967300bdba5ed1FCB4F907C8fcd', 4, 4, 11)}
              </button> */}

              <button
                className="px-4 py-2.5 bg-blue-600 text-white
                font-medium text-xs leading-tight uppercase
                rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none
                focus:ring-0 active:bg-blue-800 active:shadow-lg
                transition duration-150 ease-in-out dark:text-gray-300
                dark:border dark:border-gray-500 dark:bg-transparent"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

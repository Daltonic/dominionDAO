import { FaUserSecret } from 'react-icons/fa'
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md'
import { truncate } from '../store'

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="navbar-collapse collapse grow flex flex-row justify-between items-center p-2">
            <div className="flex flex-row justify-start items-center space-x-3">
              <FaUserSecret
                className="cursor-pointer"
                color="#122643"
                size={25}
              />
              <span className='invisible md:visible'>Dominion</span>
            </div>

            <div className="flex flex-row justify-center items-center space-x-5">
              {true ? (
                <MdLightMode
                  className="cursor-pointer"
                  color="#122643"
                  size={25}
                />
              ) : (
                <MdOutlineLightMode
                  className="cursor-pointer"
                  color="#122643"
                  size={25}
                />
              )}
              {/* <button
                className="px-4 py-2.5 bg-blue-600 text-white
                font-medium text-xs leading-tight uppercase
                rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none
                focus:ring-0 active:bg-blue-800 active:shadow-lg
                transition duration-150 ease-in-out"
              >
                {truncate('0x66aEEbA2C8255967300bdba5ed1FCB4F907C8fcd', 4, 4, 11)}
              </button> */}

              
              <button
                className="px-4 py-2.5 bg-blue-600 text-white
                font-medium text-xs leading-tight uppercase
                rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none
                focus:ring-0 active:bg-blue-800 active:shadow-lg
                transition duration-150 ease-in-out"
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

import { AiFillGithub } from 'react-icons/ai'
import { FaGlobeAfrica } from 'react-icons/fa'
import { setGlobalState } from '../store'

const Banner = () => {
  return (
    <div className="p-8 rounded-lg text-gray-700 bg-white">
      <h2 className="font-semibold text-3xl mb-5">
        3 Proposals Currenly Opened
      </h2>
      <p>
        Learn the by example how to build a ful-fledge decentralized autonomous
        organization.
      </p>
      <hr className="my-6 border-gray-300" />
      <p>
        This is a build one out of many <span className="font-bold">DAO</span>{' '}
        applications scheduled to show up on this platform.
      </p>
      <div className="flex flex-row justify-start items-center md:w-1/3 w-full mt-4">
        <input
          type="number"
          className="form-control block w-full px-3 py-1.5
          text-base font-normaltext-gray-700bg-white
          bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 shadow-md
          focus:text-gray-700 focus:bg-white 
          focus:border-blue-600 focus:outline-none"
          id="exampleFormControlInput1"
          placeholder="e.g 2.5 Eth"
        />
      </div>
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
            duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Donate
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase rounded-r-full shadow-md
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Propose
        </button>

        <a className="ml-6" href="#">
          <AiFillGithub size={25} className="cursor-pointer" color="#122643" />
        </a>

        <a className="ml-6" href="#">
          <FaGlobeAfrica size={25} className="cursor-pointer" color="#122643" />
        </a>
      </div>
    </div>
  )
}

export default Banner

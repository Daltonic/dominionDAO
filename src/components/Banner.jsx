import { setGlobalState } from '../store'

const Banner = () => {
  return (
    <div className="p-8 rounded-b-lg text-gray-700 bg-white dark:bg-[#212936] dark:text-gray-300">
      <h2 className="font-semibold text-3xl mb-5">
        3 Proposals Currenly Opened
      </h2>
      <p>
        Learn the by example how to build a ful-fledge decentralized autonomous
        organization.
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>
        This is a build one out of many <span className="font-bold">DAO</span>{' '}
        applications scheduled to show up on this platform.
      </p>
      <div className="flex flex-row justify-start items-center md:w-1/3 w-full mt-4">
        <input
          type="number"
          className="form-control block w-full px-3 py-1.5
          text-base font-normaltext-gray-700
          bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 shadow-md
          focus:text-gray-500 focus:bg-white 
          focus:outline-none dark:border-gray-500
          dark:bg-transparent"
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
            duration-150 ease-in-out dark:text-gray-300
            dark:border dark:border-gray-300 dark:bg-transparent"
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
            duration-150 ease-in-out dark:text-gray-300
            dark:border dark:border-gray-300 dark:bg-transparent"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Propose
        </button>
      </div>
    </div>
  )
}

export default Banner

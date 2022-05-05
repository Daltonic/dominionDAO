import { AiFillGithub } from 'react-icons/ai'

const Banner = () => {
  return (
    <div className="p-8 rounded-lg text-gray-700">
      <h2 className="font-semibold text-3xl mb-5">Dominion DAO</h2>
      <p>
        Learn the by example how to build a ful-fledge decentralized autonomous
        organization.
      </p>
      <hr className="my-6 border-gray-300" />
      <p>
        This is a build one out of many DAO applications scheduled to show up on
        this platform.
      </p>
      <div className="flex flex-row justify-start items-center space-x-6 mt-4">
        <button
          type="button"
          className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase rounded-full shadow-md
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Learn more
        </button>

        <a href="#">
          <AiFillGithub size={25} className="cursor-pointer" color="#122643" />
        </a>
      </div>
    </div>
  )
}

export default Banner

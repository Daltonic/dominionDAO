import Identicon from 'react-identicons'

const Proposals = () => {
  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row justify-center items-center" role="group">
        <button
          aria-current="page"
          className="rounded-l-full px-6 py-2.5 bg-blue-800
            text-white font-medium text-xs leading-tight
            uppercase hover:bg-blue-700 focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out overflow-hidden"
        >
          Open
        </button>
        <button
          aria-current="page"
          className="rounded-r-full px-6 py-2.5 bg-blue-600
            text-white font-medium text-xs leading-tight
            uppercase hover:bg-blue-700 focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out overflow-hidden"
        >
          Closed
        </button>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Expires
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill()
                  .map((item, i) => (
                    <tr
                      key={i}
                      className="cursor-pointer bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-row justify-start items-center space-x-3">
                          <Identicon
                            string={'Mark Zuck' + i}
                            size={25}
                            className="h-10 w-10 object-contain rounded-full mr-3"
                          />
                          <span>Mark Zuck</span>
                        </div>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        7 days
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button
          aria-current="page"
          className="rounded-full px-6 py-2.5 bg-blue-600
            text-white font-medium text-xs leading-tight
            uppercase hover:bg-blue-700 focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out"
        >
          Load More
        </button>
      </div>
    </div>
  )
}

export default Proposals

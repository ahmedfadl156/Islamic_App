function SkeletonLoader() {
  return (
    <div className="space-y-6">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg bg-gray-50">
          <div className="bg-gray-200 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex-shrink-0 mt-1"></div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="space-y-2">
              <div className="h-6 lg:h-7 bg-gray-200 rounded-md w-full"></div>
              <div className="h-6 lg:h-7 bg-gray-200 rounded-md w-4/5"></div>
              <div className="h-6 lg:h-7 bg-gray-200 rounded-md w-3/4"></div>
              {index % 2 === 0 && <div className="h-6 lg:h-7 bg-gray-200 rounded-md w-2/3"></div>}
            </div>
            <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded-full w-24"></div>
              </div>
              <div className="h-8 lg:h-10 bg-gray-300 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default SkeletonLoader

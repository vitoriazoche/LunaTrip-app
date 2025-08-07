export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center">
      <div className="w-full max-w-[468px] bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

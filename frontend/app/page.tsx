export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Zenith</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
        Your safe, empathetic AI companion designed to help you navigate academic pressure and maintain mental wellness.
      </p>
      <div className="flex gap-4">
        <a href="/checkin" className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-teal-500 transition">Start Daily Check-in</a>
        <a href="/chat" className="px-6 py-3 border border-primary text-primary rounded-md font-medium hover:bg-teal-50 transition">Talk to Zenith</a>
      </div>
    </div>
  )
}

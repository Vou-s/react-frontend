import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white">
      <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
        Welcome to My App 🚀
      </h1>
      <p className="text-lg mb-8 max-w-md text-center opacity-90">
        A modern platform built with React + Laravel. Start your journey by logging in!
      </p>
      <Link
        to="/login"
        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transform transition duration-200"
      >
        Get Started
      </Link>
      
    </div>
  )
}

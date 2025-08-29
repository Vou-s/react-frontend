import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    api.get('/user')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [navigate])

  const handleLogout = async () => {
    await api.post('/logout')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MyApp</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">
        <div
          className="
            bg-white rounded-2xl shadow-lg p-6 
            w-full max-w-6xl mx-auto 
            grid grid-cols-1 md:grid-cols-3 gap-6
            animate-fade-in
          "
        >
          {/* Left Sidebar */}
          <aside className="hidden md:block col-span-1 bg-gray-50 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Menu</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
              <li className="hover:text-blue-600 cursor-pointer">Profile</li>
              <li className="hover:text-blue-600 cursor-pointer">Settings</li>
            </ul>
          </aside>

          {/* Main Content */}
          <section className="col-span-2 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>
            {user ? (
              <p className="text-gray-600 text-lg">
                Welcome back, <span className="font-semibold">{user.name}</span> 🎉
              </p>
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

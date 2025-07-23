import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between px-4 py-10"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
                          url('https://images.unsplash.com/photo-1560185127-6a8c6e8d91a7?auto=format&fit=crop&w=1500&q=80')`,
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          MrProptek Company
        </h1>
        <p className="text-lg text-gray-600">Located at CP67 Mall, Mohali</p>

        <button
          onClick={() => navigate("/todolist")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          MrProptek-task
        </button>
      </div>

      <p className="text-sm text-white mt-10">
        Project submitted by <span className="font-semibold">Himanshu Beniwal</span>
      </p>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (!auth) {
      router.push("/login")
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard ATLAS
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Usuários</h2>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Planos Ativos</h2>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Indicações</h2>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>
      </div>
    </div>
  )
}
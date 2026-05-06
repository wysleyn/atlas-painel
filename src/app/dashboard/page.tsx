"use client"

export const dynamic = "force-dynamic"
export const revalidate = 0

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
export default function Dashboard() {
  const router = useRouter()

  const [usuarios, setUsuarios] = useState<number | null>(null)
  const [planosAtivos, setPlanosAtivos] = useState<number | null>(null)
  const [indicacoes, setIndicacoes] = useState<number | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (!auth) {
      router.push("/login")
      return
    }

    async function carregarDados() {
    const { data: users, error } = await supabase
  .from("users")
  .select("*")

      console.log("USERS:", users)

      if (users) {
        setUsuarios(users.length)

        const ativos = users.filter(
          (u: any) =>
            u.plano_fim && new Date(u.plano_fim) > new Date()
        )

        setPlanosAtivos(ativos.length)

        const totalIndicacoes = users.reduce(
          (acc: number, u: any) =>
            acc + (u.indicacoes_ativas || 0),
          0
        )

        setIndicacoes(totalIndicacoes)
      }
    }

    carregarDados()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard ATLAS
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Usuários</h2>
          <p className="text-3xl font-bold mt-2">
            {usuarios ?? "Carregando..."}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Planos Ativos</h2>
          <p className="text-3xl font-bold mt-2">
            {planosAtivos ?? "Carregando..."}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Indicações Ativas</h2>
          <p className="text-3xl font-bold mt-2">
            {indicacoes ?? "Carregando..."}
          </p>
        </div>
      </div>
    </div>
  )
}

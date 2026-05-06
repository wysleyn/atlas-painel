"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState<number>(0)
  const [planosAtivos, setPlanosAtivos] = useState<number>(0)
  const [indicacoes, setIndicacoes] = useState<number>(0)

  useEffect(() => {
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    async function carregarDados() {

      const { data } = await supabase
        .from("users")
        .select("*")

      if (data) {
        setUsuarios(data.length)

        const ativos = data.filter(
          (u: any) =>
            u.plano_fim && new Date(u.plano_fim) > new Date()
        )

        setPlanosAtivos(ativos.length)

        const totalIndicacoes = data.reduce(
          (acc: number, u: any) =>
            acc + (u.indicacoes_ativas || 0),
          0
        )

        setIndicacoes(totalIndicacoes)
      }
    }

    carregarDados()

  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard ATLAS
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Usuários</h2>
          <p className="text-3xl font-bold mt-2">{usuarios}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Planos Ativos</h2>
          <p className="text-3xl font-bold mt-2">{planosAtivos}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-300">Indicações Ativas</h2>
          <p className="text-3xl font-bold mt-2">{indicacoes}</p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Reluzes 2025</h1>
      
      <div className="prose prose-lg mx-auto">
        <p className="text-xl mb-6">
          Bem-vindo ao Reluzes, um dos maiores eventos religiosos de Belo Horizonte, Minas Gerais!
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sobre o Evento</h2>
          <p>
            O Reluzes é um encontro anual que reúne milhares de pessoas em busca de uma experiência
            espiritual transformadora. Com palestras inspiradoras, momentos de adoração e
            oportunidades únicas de conexão, o evento promete ser inesquecível.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data e Local</h2>
          <p>
            O evento acontecerá nos dias [DATAS] de 2025, em Belo Horizonte, Minas Gerais.
            Local: [ENDEREÇO DO EVENTO]
          </p>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/inscricao"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer minha inscrição
          </Link>
        </div>
      </div>
    </div>
  )
}
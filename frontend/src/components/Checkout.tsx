import React from 'react'
import { useNavigate } from 'react-router-dom'

type Participant = {
  name: string
  age: number
  phone?: string
  gender: 'M' | 'F' | 'O'
  wantsTshirt: boolean
  tshirtSize?: string
  imageRights: boolean
}

type CheckoutProps = {
  participants: Participant[]
  total: number
}

export default function Checkout({ participants, total }: CheckoutProps) {
  const navigate = useNavigate()

  const handleConfirm = () => {
    // Handle payment confirmation (e.g., send data to server)
    alert('Compra confirmada!')
    // Then navigate somewhere...
  }

  const handleCancel = () => {
    navigate(-1) // Go back to previous page
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">Resumo da Compra</h1>
      <div className="mb-4">
        {participants.map((participant, index) => (
          <div key={index} className="border-b py-2">
            <p><b>Nome:</b> {participant.name}</p>
            <p><b>Idade:</b> {participant.age}</p>
            <p><b>Gênero:</b> {participant.gender}</p>
            <p><b>Telefone:</b> {participant.phone}</p>
            <p>
              <b>Camisa:</b>{' '}
              {participant.wantsTshirt ? `Sim (${participant.tshirtSize || 'Tamanho não informado'})` : 'Não'}
            </p>
          </div>
        ))}
      </div>

      <div className="text-2xl font-semibold mb-4">
        Total: R$ {total},00
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleCancel}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
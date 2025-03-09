import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import StripeCheckout from '../components/StripeCheckout'
import EventTerms from '../components/EventTerms'
const valores = {
  menor: 50,
  medio: 55,
  maior: 60,
  meia: 25,
  camiseta : 30
}

const participantSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  age: z.number().min(0, "A idade deve ser maior do que 0").max(120, "A idade deve ser menor do que 120"),
  gender: z.enum(['M', 'F', 'O']),
  wantsTshirt: z.boolean(),
  tshirtSize: z.enum(['PP', 'P', 'M', 'G', 'GG', 'XG']).optional(),
  imageRights: z.boolean(),
  phone: z.string().optional().refine(value => !value || value.length >= 10 && value.match(/^\d+$/), {
    message: 'Telefone inválido, digite apenas nos números'})
})

const subscriptionSchema = z.object({
  mainContact: z.object({
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
  }),
  participants: z.array(participantSchema).min(1, 'Adicione pelo menos um participante')
})

type SubscriptionForm = z.infer<typeof subscriptionSchema>

export default function SubscriptionPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState<SubscriptionForm | null>(null)
  const { register, control, handleSubmit, formState: { errors } } = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      participants: [{}]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants"
  })

  const onSubmit = async (data: SubscriptionForm) => {
    setFormData(data)
    setShowPayment(true)
  }
  const calculateTotal = (participants: any[]) => {
    // Mock price calculation: R$100 per participant
    // Add R$30 for each t-shirt requested
    return participants.reduce((total, participant) => {
      let participantTotal = 100 // Base price
      if (participant.wantsTshirt) {
        participantTotal += 30 // T-shirt price
      }
      return total + participantTotal
    }, 0)
  }

  if (!acceptedTerms) {
    return (<EventTerms valores={valores} setAcceptedTerms={setAcceptedTerms} />)
  }




  if (showPayment && formData) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Pagamento</h1>
        <StripeCheckout
          amount={calculateTotal(formData.participants)}
          participants={formData.participants}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Inscrição Reluzes 2025</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Dados de Contato</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register('mainContact.email')}
                className="w-full p-2 border rounded"
              />
              {errors.mainContact?.email && (
                <p className="text-red-500 text-sm">{errors.mainContact.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="tel"
                {...register('mainContact.phone')}
                className="w-full p-2 border rounded"
              />

            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Participantes</h2>

          {fields.map((field, index) => (
            <div key={field.id} className="mb-6 p-4 border rounded">
              <h3 className="text-lg font-medium mb-3">Participante {index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    {...register(`participants.${index}.name` as const)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <input
                    {...register(`participants.${index}.phone` as const)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Idade</label>
                  <input
                    type="number"
                    {...register(`participants.${index}.age` as const, { valueAsNumber: true })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gênero</label>
                  <select
                    {...register(`participants.${index}.gender` as const)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`participants.${index}.wantsTshirt` as const)}
                    />
                    <span>Deseja camiseta? (R${valores.camiseta},00)</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tamanho da Camiseta</label>
                  <select
                    {...register(`participants.${index}.tshirtSize` as const)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="PP">PP</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`participants.${index}.imageRights` as const)}
                    />
                    <span>Autorizo uso de imagem</span>
                  </label>
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-4 text-red-600 hover:text-red-800"
                >
                  Remover participante
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({})}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Adicionar Participante
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg"
          >
            Prosseguir para Pagamento
          </button>
        </div>
      </form>
    </div>
  )
}
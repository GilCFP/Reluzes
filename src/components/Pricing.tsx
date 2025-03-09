import React from 'react'

export default function Pricing({ valores }: { valores: any }) {
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mb-4 mt-4'>Valores</h2>
      <p className='text-l'>
        Esse ano, você pode escolher o valor da sua inscrição, de acordo com a sua realidade financeira. <br />
        Os valores são: R$ {valores.menor}, R${valores.medio} e R${valores.maior}.
      </p>
      <br />
      <table className='table-auto w-full text-left'>
        <thead>
          <tr>
            <th className='px-4 py-2 border bg-gray-100'>Categoria</th>
            <th className='px-4 py-2 border bg-gray-100'>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-4 py-2'>Crianças de 0 a 6 anos</td>
            <td className='border px-4 py-2'>Entrada Franca</td>
          </tr>
          <tr>
            <td className='border px-4 py-2'>Crianças de 7 a 12 anos</td>
            <td className='border px-4 py-2'>Meia-entrada: R${valores.meia}</td>
          </tr>
          <tr>
            <td className='border px-4 py-2'>Acima de 13 anos</td>
            <td className='border px-4 py-2'>
              Inteira (R$ {valores.menor}, R${valores.medio} ou R${valores.maior})
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <p className='text-l'>
        Além disso, para facilitar a logística do evento, <b>nesta edição o pagamento deverá ser realizado ao final da inscrição.</b> Mas não se preocupe, você pode efetuar o pagamento em até 10x no cartão de crédito
      </p>
    </div>
  )
}
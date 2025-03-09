import React from 'react'
import Pricing from './Pricing'

export default function EventTerms({ valores, setAcceptedTerms }: { valores: any, setAcceptedTerms: (val: boolean) => void }) {
  return (
    <div id='event-terms' className='max-w-4xl mx-auto'>
      <div className='bg-white p-6 rounded-lg shadow'>
        <div>
          <h1 className='text-3xl font-bold text-center mb-8'>Regulamento das inscrições</h1>
          <p className='text-l'>A inscrição é individual e cada participante deverá preencher um formulário por vez. 
            Caso seja menor de idade, peça autorização de seus pais ou responsáveis para participar do Encontro. Nesse caso, entraremos em contato com os respectivos responsáveis para confirmar a sua inscrição.</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-center mb-4 mt-4'>Participação de crianças e jovens</h2>
          <p className='text-l'>O RELUZES é um encontro para toda Família que visa o Estudo e a Convivência cristã, à luz do Espiritismo.</p>
          <p className='text-l'>
            <b>Todas as crianças e todos os jovens</b> (menores de 18 anos) que desejarem participar do evento, <b>deverão estar acompanhados por um responsável.</b> Caso os responsáveis legais não possam estar presentes no evento, deverão enviar uma autorização assinada e os mesmos deverão indicar um Adulto que estará no Encontro para se responsabilizar pelos cuidados necessários com a criança e/ou com o jovem.
          </p>
          <br />
          <p className='text-l'>Além de atividades em conjunto para todas as idades, haverá Evangelização Infanto-Juvenil durante todos os Estudos dos adultos.
            Salientamos que, nos demais horários, os pais, ou os devidos responsáveis pelas crianças/jovens, ficarão com o compromisso de cuidar dos seus respectivos tutelados no encontro.
            Oriente-os sobre o funcionamento do Evento e sobre a importância da participação cristã,  durante todo o RELUZES!
          </p>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-center mb-4 mt-4'>Orientações Gerais</h2>
          <p className='text-l'>O RELUZES acontecerá nos dias <b>30 e 31 de Agosto</b> no local de costume, <b>Sítio São José e Sítio Santa Rita(Ribeirão das Neves).</b> O horário de início no sábado é 8:00 e a previsão de término é no domingo às 17:00.</p>
          <p className='text-l'></p>
          <p className='text-l'>O RELUZES é um evento sem fins lucrativos, visando um momento de conexão com cristo e aprendizado.
            Para manter o evento acessível, nós contamos com doações de alimentos não perecíveis ou contribuição financeira e valorizamos qualquer contribuição independente do valor.
            Portanto, caso esteja ao seu alcance, agradeceríamos imensamente por qualquer contribuição.
          </p>
        </div>
        <Pricing valores={valores} />
        <div>
          <h2 className='text-2xl font-bold text-center mb-4 mt-4'>Termos e Condições</h2>
          <p className='text-l'>Ao clicar em "Aceitar", você concorda com os termos e condições do evento e com a política de privacidade do site.</p>
          <div className='flex justify-center mt-4'>
            <button
              onClick={() => setAcceptedTerms(true)}
              className='bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg'
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
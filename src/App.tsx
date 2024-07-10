import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'lucasdev2002@.com.br',
    'jhonSnow@.com.br',
  ])

  function OpenGestInput() {
    setIsOpen(true)
  }
  function CloseGestInput() {
    setIsOpen(false)
  }
  function opengestIsModal() {
    setIsModalOpen(true)
  }
  function CloseGestModal() {
    setIsModalOpen(false)
  }
  function AddNweEmalToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }
    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])


    event.currentTarget.reset()
  }

  function removeEmailfromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email != emailToRemove)

    setEmailsToInvite(newEmailList)
  }



  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src='/logo.svg' alt='plann.er' />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua Viagem!</p>
        </div>
        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input
                disabled={isOpen}
                placeholder="Para onde Você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none " />
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='size-5 text-zinc-400' />
              <input
                disabled={isOpen}
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40  outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800' />

            {isOpen ? (
              <button
                onClick={CloseGestInput}
                className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar Local/data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button
                onClick={OpenGestInput}
                className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
          </div>

          {isOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type='button' onClick={opengestIsModal} className='flex items-center gap-2 flex-1 text-left'>
                <UserRoundPlus className='size-5 text-zinc-400' />
                <span className="bg-transparent text-zinc-400 text-lg flex-1">
                  Quem Estará na Viagem?
                </span>
              </button>

              <div className='w-px h-6 bg-zinc-800' />

              <button className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar Viagem
                <ArrowRight className='size-5' />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos
          <a href="#" className="text-zinc-300 underline">termos de uso</a>
          e
          <a href="#" className="text-zinc-300 underline">politica de privacidade</a>
        </p>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar Convidados</h2>
                <X onClick={CloseGestModal} className='size-5 text-zinc-400 cursor-pointer' />
              </div>
              <p className='text-sm text-zinc-400'>os convidados irão receber e-mails  para confirmar na viagem</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map(email => {
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                    <span className='text-zinc-300'>{email}</span>
                    <button type='button' onClick={() => removeEmailfromInvites(email)}>
                      <X className='size-4 text-zinc-400' />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className='w-full h-10 bg-zinc-800'>
              <form onSubmit={AddNweEmalToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <AtSign className='text-zinc-400 size-4' />
                <input
                  type='email'
                  name='email'
                  placeholder="Digite o e-mail do Convidado?"
                  className="bg-transparent text-lg placeholder-zinc-400 w-full  outline-none flex-1" />
                <button type='submit' className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                  Convidar
                  <Plus className='size-5' />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



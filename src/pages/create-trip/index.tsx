import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGestsModal } from './invite-gests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([])
  const [isConfirmTripModal, setIsConfirmTripModal] = useState(false)

  function openGestInput() {
    setIsOpen(true)
  }
  function closeGestInput() {
    setIsOpen(false)
  }
  function opengestIsModal() {
    setIsModalOpen(true)
  }
  function closeGestModal() {
    setIsModalOpen(false)
  }
  function openConfirmTripModal() {
    setIsConfirmTripModal(true)
  }
  function closeConfirmTripModal() {
    setIsConfirmTripModal(false)
  }
  function addNweEmalToInvite(event: FormEvent<HTMLFormElement>) {
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
  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/trips/123')
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
                onClick={closeGestInput}
                className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar Local/data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button
                onClick={openGestInput}
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
                {emailsToInvite.length > 0 ? (
                  <span className='text-zinc-100 text-lg flex-1'>
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </span>
                ) : (
                  <span className="bg-transparent text-zinc-400 text-lg flex-1">
                    Quem Estará na Viagem?
                  </span>
                )}
              </button>

              <div className='w-px h-6 bg-zinc-800' />

              <button onClick={openConfirmTripModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
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
        <InviteGestsModal
          emailsToInvite={emailsToInvite}
          addNweEmalToInvite={addNweEmalToInvite}
          closeGestModal={closeGestModal}
          removeEmailfromInvites={removeEmailfromInvites}
        />
      )}
      {isConfirmTripModal && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  )
}
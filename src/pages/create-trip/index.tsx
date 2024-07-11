import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGestsModal } from './invite-gests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGestsStep } from './steps/invite-gest-stap'

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
          <DestinationAndDateStep
            isOpen={isOpen}
            openGestInput={openGestInput}
            closeGestInput={closeGestInput}
          />

          {isOpen && (
            <InviteGestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              opengestIsModal={opengestIsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos
          <a href="#" className="text-zinc-300 underline">termos de uso</a>
          e
          <a href="#" className="text-zinc-300 underline">politica de privacidade</a>
        </p>

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
    </div>
  )
}
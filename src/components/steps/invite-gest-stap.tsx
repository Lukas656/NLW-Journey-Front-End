import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../button"

interface InviteGestsStepProps {
    opengestIsModal: () => void,
    openConfirmTripModal: () => void,
    emailsToInvite: string[],
}
export function InviteGestsStep(props: InviteGestsStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type='button' onClick={props.opengestIsModal} className='flex items-center gap-2 flex-1 text-left'>
                <UserRoundPlus className='size-5 text-zinc-400' />
                {props.emailsToInvite.length > 0 ? (
                    <span className='text-zinc-100 text-lg flex-1'>
                        {props.emailsToInvite.length} pessoa(s) convidada(s)
                    </span>
                ) : (
                    <span className="bg-transparent text-zinc-400 text-lg flex-1">
                        Quem Estará na Viagem?
                    </span>
                )}
            </button>

            <div className='w-px h-6 bg-zinc-800' />

            <Button tyButton="primary" onClick={props.openConfirmTripModal} >
                Confirmar Viagem
                <ArrowRight className='size-5' />
            </Button>
        </div>

    )
}
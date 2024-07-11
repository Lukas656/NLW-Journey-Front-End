import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"

interface InviteGestsModalProps {
    closeGestModal: () => void,
    emailsToInvite: string[],
    addNweEmalToInvite: (event: FormEvent<HTMLFormElement>) => void,
    removeEmailfromInvites: (email: string) => void,

}

export function InviteGestsModal(props: InviteGestsModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Selecionar Convidados</h2>
                        <X onClick={props.closeGestModal} className='size-5 text-zinc-400 cursor-pointer' />
                    </div>
                    <p className='text-sm text-zinc-400'>os convidados irão receber e-mails  para confirmar na viagem</p>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {props.emailsToInvite.map(email => {
                        return (
                            <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                                <span className='text-zinc-300'>{email}</span>
                                <button type='button' onClick={() => props.removeEmailfromInvites(email)}>
                                    <X className='size-4 text-zinc-400' />
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className='w-full h-10 bg-zinc-800'>
                    <form onSubmit={props.addNweEmalToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
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
    )
}
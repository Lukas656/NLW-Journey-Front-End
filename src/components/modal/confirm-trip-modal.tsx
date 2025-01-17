import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../button";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void,
    createTrip: (event: FormEvent<HTMLFormElement>) => void,
    setOwnerName: (name: string) => void,
    setOwnerEmail: (email: string) => void,
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail,


}: ConfirmTripModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[748px] rounded-xl py-10 px-5 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Confirmar Criação de Viagem</h2>
                        <X onClick={closeConfirmTripModal} className='size-5 text-zinc-400 cursor-pointer' />
                    </div>
                    <p className='text-sm text-zinc-400'>
                        Para concluir a criação da viagem para
                        <span className='text-xinc-100 font-semibold'> Florianópolis, Brasil </span>
                        nas datas de <span className='text-xinc-100 font-semibold'>16 a 27 de Agosto de 2024 </span>
                        preencha seus dados abaixo:
                    </p>
                </div>
                <form onSubmit={createTrip} className='space-y-3 '>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <User className='text-zinc-400 size-4' />
                        <input
                            onChange={event => setOwnerName(event.target.value)}
                            name='nome'
                            placeholder="Seu Nome Completo"
                            className="bg-transparent text-lg placeholder-zinc-400 w-full  outline-none flex-1" />
                    </div>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <User className='text-zinc-400 size-4' />
                        <input
                            onChange={event => setOwnerEmail(event.target.value)}
                            type='email'
                            name='email'
                            placeholder="Seu e-mail pessoal"
                            className="bg-transparent text-lg placeholder-zinc-400 w-full  outline-none flex-1" />
                    </div>
                    <Button type="submit" size="full">
                        Confirmar criação da viagem
                    </Button>
                </form>
            </div>
        </div>
    )
}